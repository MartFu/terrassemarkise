"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Trophy,
  Star,
  TrendingUp,
  Wind,
  Palette,
} from "lucide-react";
import { SITE_URLS } from "@/lib/constants";

// ============================================================================
// TYPES
// ============================================================================

type ProductSlug = "jamaica" | "corsica" | "palladio";
type Phase = "intro" | "quiz" | "results";

interface ProductMatch {
  slug: ProductSlug;
  name: string;
  score: number;
  reasons: string[];
  image: string;
  priceFrom: number;
  tagline: string;
  matchPercentage: number;
}

interface Answer {
  questionId: string;
  value: string;
}

interface Option {
  id: string;
  label: string;
  sub: string;
  badge: string;
}

interface Question {
  id: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  options: Option[];
}

// ============================================================================
// DATA
// ============================================================================

const QUESTIONS: Question[] = [
  {
    id: "experience",
    title: "Hva er viktigst for deg?",
    sub: "Velg det som føles mest riktig",
    icon: <Sparkles className="w-4 h-4" />,
    options: [
      {
        id: "smart",
        label: "Smart & Sømløst",
        sub: "App-styring, automatiske sensorer",
        badge: "Somfy IO",
      },
      {
        id: "cozy",
        label: "Koselig Stemning",
        sub: "LED-lys, varm atmosfære, kvelder",
        badge: "LED",
      },
      {
        id: "protected",
        label: "Maksimal Beskyttelse",
        sub: "Lukket kassett, robust konstruksjon",
        badge: "Kassett",
      },
      {
        id: "flexible",
        label: "Fleksibel & Praktisk",
        sub: "Tak eller vegg, mange valgmuligheter",
        badge: "Allsidig",
      },
    ],
  },
  {
    id: "style",
    title: "Hvilken stil passer hjemmet?",
    sub: "Tenk på fasaden og uteplassen",
    icon: <Palette className="w-4 h-4" />,
    options: [
      {
        id: "modern_black",
        label: "Moderne Eleganse",
        sub: "Sort ramme for eksklusivt uttrykk",
        badge: "RAL 9005",
      },
      {
        id: "classic",
        label: "Klassisk Tidløs",
        sub: "Hvit, grå eller beige",
        badge: "5 farger",
      },
      {
        id: "minimal",
        label: "Minimalistisk",
        sub: "Diskret design som ikke dominerer",
        badge: "Understated",
      },
    ],
  },
  {
    id: "investment",
    title: "Ønsket investeringsnivå?",
    sub: "Kvalitet koster – vi har noe for alle",
    icon: <TrendingUp className="w-4 h-4" />,
    options: [
      {
        id: "low",
        label: "Smart Valg",
        sub: "Utmerket verdi uten kompromiss",
        badge: "fra 8 152 kr",
      },
      {
        id: "medium",
        label: "Balansert",
        sub: "Ekstra funksjoner og beskyttelse",
        badge: "fra 14 845 kr",
      },
      {
        id: "high",
        label: "Premium Opplevelse",
        sub: "Topp kvalitet og eksklusivt design",
        badge: "fra 17 394 kr",
      },
    ],
  },
  {
    id: "location",
    title: "Hvor skal markisen leve?",
    sub: "Miljøet påvirker det beste valget",
    icon: <Wind className="w-4 h-4" />,
    options: [
      {
        id: "coastal",
        label: "Kystnært & Eksponert",
        sub: "Mye vind, saltluft, krevende forhold",
        badge: "15 m/s",
      },
      {
        id: "suburban",
        label: "Forstad / Hage",
        sub: "Normalt klima, noe le fra bygninger",
        badge: "Standard",
      },
      {
        id: "sheltered",
        label: "Beskyttet Gårdsrom",
        sub: "Innendørs eller svært skjermet",
        badge: "12 m/s",
      },
    ],
  },
];

const BASE_PRODUCTS: Omit<
  ProductMatch,
  "score" | "reasons" | "matchPercentage"
>[] = [
  {
    slug: "jamaica",
    name: "Jamaica",
    image: "/assets/product-images/jamaica_profile.png",
    priceFrom: 8152,
    tagline: "Allsidig fleksibilitet",
  },
  {
    slug: "corsica",
    name: "Corsica",
    image: "/assets/product-images/corsica_profile.png",
    priceFrom: 14845,
    tagline: "Beskyttet eleganse",
  },
  {
    slug: "palladio",
    name: "Palladio",
    image: "/assets/product-images/palladio_profile.png",
    priceFrom: 17394,
    tagline: "Eksklusivt håndverk",
  },
];

// ============================================================================
// SCORING
// ============================================================================

function calculateMatches(answers: Answer[]): ProductMatch[] {
  const matches: ProductMatch[] = BASE_PRODUCTS.map((p) => ({
    ...p,
    score: 0,
    reasons: [],
    matchPercentage: 0,
  }));

  const add = (slug: ProductSlug, pts: number, reason: string) => {
    const m = matches.find((x) => x.slug === slug);
    if (m) {
      m.score += pts;
      m.reasons.push(reason);
    }
  };

  for (const { questionId, value } of answers) {
    if (questionId === "experience") {
      if (value === "smart") {
        add("palladio", 40, "Somfy IO inkludert – premium smart-styring");
        add("corsica", 25, "Tilgjengelig med RTS/IO motorer");
        add("jamaica", 20, "Flest motoralternativer");
      }
      if (value === "cozy") {
        add("corsica", 50, "Eneste med integrert LED-belysning");
        add("palladio", 10, "Elegant stemning, men uten LED");
        add("jamaica", 5, "God atmosfære");
      }
      if (value === "protected") {
        add("corsica", 35, "Full kassettbeskyttelse + LED");
        add("palladio", 35, "Full kassettbeskyttelse, eksklusivt design");
        add("jamaica", 15, "Toppdeksel tilgjengelig som tilvalg");
      }
      if (value === "flexible") {
        add("jamaica", 40, "Tak eller vegg, flest valgmuligheter");
        add("corsica", 20, "God fleksibilitet");
        add("palladio", 15, "Fast kassett-design");
      }
    }
    if (questionId === "style") {
      if (value === "modern_black") {
        add("palladio", 45, "Unik RAL 9005 (sort) uten pristillegg");
        add("corsica", -5, "Ikke tilgjengelig i sort");
        add("jamaica", -5, "Ikke tilgjengelig i sort");
      }
      if (value === "classic") {
        add("corsica", 20, "5 elegante farger");
        add("jamaica", 20, "5 klassiske farger");
        add("palladio", 20, "6 farger inkludert sort");
      }
      if (value === "minimal") {
        add("palladio", 25, "Diskret, sofistikert kassett-design");
        add("corsica", 20, "Slepp kassett-profil");
        add("jamaica", 15, "Åpen, lett konstruksjon");
      }
    }
    if (questionId === "investment") {
      if (value === "low") {
        add("jamaica", 50, "Beste verdi – fra 8 152 kr");
        add("corsica", -15, "Over budsjettet");
        add("palladio", -25, "Premium-pris");
      }
      if (value === "medium") {
        add("corsica", 40, "Perfekt balanse pris/kvalitet");
        add("jamaica", 15, "Godt innenfor budsjett");
        add("palladio", -10, "Litt over målet");
      }
      if (value === "high") {
        add("palladio", 45, "Premium opplevelse verdt investeringen");
        add("corsica", 30, "Høy kvalitet");
        add("jamaica", 10, "God, men kanskje for enkel?");
      }
    }
    if (questionId === "location") {
      if (value === "coastal") {
        add("jamaica", 30, "Vindklasse 15 m/s – robust konstruksjon");
        add("corsica", 30, "Vindklasse 15 m/s + kassettbeskyttelse");
        add("palladio", -10, "Vindklasse 12 m/s kan være for svak");
      }
      if (value === "suburban") {
        add("corsica", 20, "God beskyttelse mot standard vær");
        add("palladio", 20, "Elegant løsning for normalt miljø");
        add("jamaica", 20, "Pålitelig i de fleste omgivelser");
      }
      if (value === "sheltered") {
        add("palladio", 25, "Perfekt for beskyttede områder");
        add("corsica", 20, "Mer beskyttelse enn nødvendig, men flott");
        add("jamaica", 15, "God løsning");
      }
    }
  }

  const MAX_SCORE = 150;
  for (const m of matches) {
    m.matchPercentage = Math.min(
      100,
      Math.max(0, Math.round((m.score / MAX_SCORE) * 100)),
    );
  }

  return matches.sort((a, b) => b.score - a.score);
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1 rounded-full bg-muted"
          animate={{
            width: i === current ? 24 : i < current ? 16 : 6,
            backgroundColor: i <= current ? "var(--primary)" : "var(--muted)",
          }}
          transition={{ duration: 0.35 }}
        />
      ))}
    </div>
  );
}

function OptionButton({
  option,
  selected,
  onClick,
  index,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileTap={{ scale: 0.985 }}
      className={[
        "relative flex items-start gap-3 w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all duration-200",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40 hover:shadow-sm",
      ].join(" ")}
    >
      {/* Radio indicator */}
      <div
        className={[
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30",
        ].join(" ")}
      >
        {selected && <CheckCircle2 className="w-3 h-3" />}
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={[
            "mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {option.badge}
        </span>
        <p className="text-sm font-semibold text-foreground leading-snug">
          {option.label}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
          {option.sub}
        </p>
      </div>
    </motion.button>
  );
}

function MatchBar({ pct, isWinner }: { pct: number; isWinner: boolean }) {
  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <span className="text-xs font-semibold text-muted-foreground">
        {pct}% match
      </span>
      <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={
            isWinner
              ? "h-full bg-primary rounded-full"
              : "h-full bg-muted-foreground/40 rounded-full"
          }
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ResultCard({ match, rank }: { match: ProductMatch; rank: number }) {
  const isWinner = rank === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1, type: "spring", stiffness: 120 }}
      className={[
        "overflow-hidden rounded-2xl border-2 transition-shadow",
        isWinner
          ? "border-primary shadow-lg"
          : "border-border shadow-sm opacity-90",
      ].join(" ")}
    >
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span
          className={[
            "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
            isWinner
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {isWinner ? (
            <>
              <Trophy className="w-3 h-3" /> Din match
            </>
          ) : (
            `#${rank + 1} Alternativ`
          )}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        {/* Product row */}
        <div className="flex gap-3 items-start">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted/40">
            <Image
              src={match.image}
              alt={match.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-foreground leading-tight">
              {match.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {match.tagline}
            </p>
            <p className="mt-1.5 text-lg font-bold text-primary">
              {match.priceFrom.toLocaleString("nb-NO")} kr
              <span className="text-xs font-normal text-muted-foreground ml-1">
                fra
              </span>
            </p>
          </div>
        </div>

        {/* Reasons */}
        {match.reasons.length > 0 && (
          <ul className="space-y-1.5">
            {match.reasons.slice(0, 2).map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <Star className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                {r}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Link
            href={`${SITE_URLS.AWNINGS}/${match.slug}`}
            className={[
              "flex-1 rounded-lg py-2.5 text-center text-sm font-semibold transition-colors",
              isWinner
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ].join(" ")}
          >
            Se detaljer
          </Link>
          <Link
            href={`/konfigurator?product=${match.slug}`}
            className="flex-1 rounded-lg border-2 border-primary py-2.5 text-center text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Konfigurer
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN
// ============================================================================

export default function MarkiseVeileder() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const q = QUESTIONS[step];
  const currentVal = answers.find((a) => a.questionId === q?.id)?.value;
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => [
        ...prev.filter((a) => a.questionId !== q.id),
        { questionId: q.id, value },
      ]);
      setTimeout(() => {
        if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
        else setPhase("results");
      }, 350);
    },
    [q, step],
  );

  const handleBack = useCallback(() => {
    if (step === 0) {
      setPhase("intro");
      return;
    }
    setStep((s) => s - 1);
  }, [step]);

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setPhase("intro");
  }, []);

  const matches = useMemo(
    () => (phase === "results" ? calculateMatches(answers) : []),
    [phase, answers],
  );

  // The root fills its container; header is fixed, body scrolls.
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Finn din perfekte markise
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-3 max-w-xs text-base text-muted-foreground"
            >
              Fire spørsmål som hjelper deg finne den ideelle løsningen for din
              terrasse
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("quiz")}
              className="mt-8 flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
            >
              Start veileder <ArrowRight className="h-4 w-4" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xs text-muted-foreground/60"
            >
              Tar ca. 1 minutt · Ingen registrering
            </motion.p>
          </motion.div>
        )}

        {/* ── QUIZ ──────────────────────────────────────────────────────── */}
        {phase === "quiz" && q && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col overflow-hidden"
          >
            {/* Sticky header */}
            <div className="shrink-0 space-y-3 px-4 pb-3 pt-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" /> Tilbake
                </button>
                <ProgressDots current={step} total={QUESTIONS.length} />
                <span className="text-sm font-medium tabular-nums text-muted-foreground">
                  {step + 1} / {QUESTIONS.length}
                </span>
              </div>
              <div className="h-0.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Scrollable question + options */}
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Question heading */}
                  <div className="mb-5 mt-2">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-lg bg-primary/10 p-1.5 text-primary">
                        {q.icon}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Spørsmål {step + 1}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-snug text-foreground">
                      {q.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {q.sub}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, i) => (
                      <OptionButton
                        key={opt.id}
                        option={opt}
                        selected={currentVal === opt.id}
                        onClick={() => handleSelect(opt.id)}
                        index={i}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── RESULTS ───────────────────────────────────────────────────── */}
        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col overflow-hidden"
          >
            {/* Sticky results header */}
            <div className="shrink-0 border-b border-border px-4 py-4">
              <h2 className="text-2xl font-bold text-foreground">
                Vi fant din match!
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Basert på dine svar anbefaler vi:
              </p>
            </div>

            {/* Scrollable result cards */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {matches.map((m, i) => (
                <ResultCard key={m.slug} match={m} rank={i} />
              ))}

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Start på nytt
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
