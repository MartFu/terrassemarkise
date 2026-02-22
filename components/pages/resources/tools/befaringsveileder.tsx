"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Shield,
  Home,
  Zap,
  Sun,
  Wind,
  Palette,
  HelpCircle,
  TrendingUp,
  Award,
  Star,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

type ProductSlug = "jamaica" | "corsica" | "palladio";

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
  value: string | boolean;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  options: {
    id: string;
    label: string;
    description: string;
    value: string | boolean;
    highlight?: string;
  }[];
}

// ============================================================================
// CONFIGURATION - Premium, focused questions
// ============================================================================

const QUESTIONS: Question[] = [
  {
    id: "experience",
    title: "Hva er viktigst for deg?",
    subtitle: "Velg den som føles mest riktig for din terrasse",
    icon: <Sparkles className="w-5 h-5" />,
    options: [
      {
        id: "smart",
        label: "Smart & Sømløst",
        description: "App-styring, automatiske sensorer, moderne teknologi",
        value: "smart",
        highlight: "Somfy IO",
      },
      {
        id: "cozy",
        label: "Koselig Stemning",
        description: "LED-lys, varm atmosfære, perfekt for kvelder",
        value: "cozy",
        highlight: "LED",
      },
      {
        id: "protected",
        label: "Maksimal Beskyttelse",
        description: "Lukket kassett, beskyttet duk, robust konstruksjon",
        value: "protected",
        highlight: "Kassett",
      },
      {
        id: "flexible",
        label: "Fleksibel & Praktisk",
        description: "Tak eller vegg, mange valg, god verdi",
        value: "flexible",
        highlight: "Allsidig",
      },
    ],
  },
  {
    id: "style",
    title: "Hvilken stil passer hjemmet ditt?",
    subtitle: "Tenk på fasaden og uteplassen",
    icon: <Palette className="w-5 h-5" />,
    options: [
      {
        id: "modern_black",
        label: "Moderne Eleganse",
        description: "Sort ramme (RAL 9005) for eksklusivt uttrykk",
        value: "modern_black",
        highlight: "RAL 9005",
      },
      {
        id: "classic",
        label: "Klassisk Tidlløs",
        description: "Hvit, grå eller beige - passer de fleste hjem",
        value: "classic",
        highlight: "5 farger",
      },
      {
        id: "minimal",
        label: "Minimalistisk",
        description: "Diskret design som ikke dominerer",
        value: "minimal",
        highlight: "Understated",
      },
    ],
  },
  {
    id: "investment",
    title: "Hvilket nivå ønsker du å investere?",
    subtitle: "Kvalitet koster, men vi har alternativer for alle",
    icon: <TrendingUp className="w-5 h-5" />,
    options: [
      {
        id: "smart_buy",
        label: "Smart Valg",
        description: "Fra 8 152 kr - Utmerket verdi uten kompromiss",
        value: "low",
        highlight: "8 152 kr",
      },
      {
        id: "balanced",
        label: "Balansert",
        description: "Fra 14 845 kr - Ekstra funksjoner og beskyttelse",
        value: "medium",
        highlight: "14 845 kr",
      },
      {
        id: "premium",
        label: "Premium Opplevelse",
        description: "Fra 17 394 kr - Topp kvalitet og eksklusivt design",
        value: "high",
        highlight: "17 394 kr",
      },
    ],
  },
  {
    id: "location",
    title: "Hvor skal den leve?",
    subtitle: "Miljøet påvirker valget",
    icon: <Wind className="w-5 h-5" />,
    options: [
      {
        id: "coastal",
        label: "Kystnært & Eksponert",
        description: "Mye vind, saltluft, krevende forhold",
        value: "coastal",
        highlight: "15 m/s",
      },
      {
        id: "suburban",
        label: "Forstad / Hage",
        description: "Normalt klima, noe le fra bygninger",
        value: "suburban",
        highlight: "Standard",
      },
      {
        id: "sheltered",
        label: "Beskyttet Gårdsrom",
        description: "Innendørs eller svært skjermet",
        value: "sheltered",
        highlight: "12 m/s",
      },
    ],
  },
];

// ============================================================================
// SCORING LOGIC - Enhanced with match percentage
// ============================================================================

function calculateMatches(answers: Answer[]): ProductMatch[] {
  const baseMatches: Omit<
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

  const matches: ProductMatch[] = baseMatches.map((m) => ({
    ...m,
    score: 0,
    reasons: [],
    matchPercentage: 0,
  }));

  const addPoints = (slug: ProductSlug, points: number, reason: string) => {
    const match = matches.find((m) => m.slug === slug);
    if (match) {
      match.score += points;
      match.reasons.push(reason);
    }
  };

  answers.forEach((answer) => {
    switch (answer.questionId) {
      case "experience":
        if (answer.value === "smart") {
          addPoints(
            "palladio",
            40,
            "Somfy IO inkludert - premium smart-styring",
          );
          addPoints("corsica", 25, "Tilgjengelig med RTS/IO motorer");
          addPoints("jamaica", 20, "Flest motoralternativer");
        } else if (answer.value === "cozy") {
          addPoints("corsica", 50, "Eneste med integrert LED-belysning");
          addPoints("palladio", 10, "Elegant stemning, men uten LED");
          addPoints("jamaica", 5, "God atmosfære, men ingen lys");
        } else if (answer.value === "protected") {
          addPoints("corsica", 35, "Full kassettbeskyttelse + LED");
          addPoints(
            "palladio",
            35,
            "Full kassettbeskyttelse, eksklusivt design",
          );
          addPoints("jamaica", 15, "Toppdeksel tilgjengelig som tilvalg");
        } else {
          addPoints("jamaica", 40, "Tak eller vegg, flest valgmuligheter");
          addPoints("corsica", 20, "God fleksibilitet");
          addPoints("palladio", 15, "Fast kassett-design");
        }
        break;

      case "style":
        if (answer.value === "modern_black") {
          addPoints("palladio", 45, "Unik RAL 9005 (sort) uten pristillegg");
          addPoints("corsica", -5, "Ikke tilgjengelig i sort");
          addPoints("jamaica", -5, "Ikke tilgjengelig i sort");
        } else if (answer.value === "classic") {
          addPoints("corsica", 20, "5 elegante farger");
          addPoints("jamaica", 20, "5 klassiske farger");
          addPoints("palladio", 20, "6 farger inkludert sort");
        } else {
          addPoints("palladio", 25, "Diskret, sofistikert kassett-design");
          addPoints("corsica", 20, "Slepp kassett-profil");
          addPoints("jamaica", 15, "Åpen, lett konstruksjon");
        }
        break;

      case "investment":
        if (answer.value === "low") {
          addPoints("jamaica", 50, "Beste verdi - fra 8 152 kr");
          addPoints("corsica", -15, "Over budsjettet");
          addPoints("palladio", -25, "Premium-pris");
        } else if (answer.value === "medium") {
          addPoints("corsica", 40, "Perfekt balanse pris/kvalitet");
          addPoints("jamaica", 15, "Godt innenfor budsjett");
          addPoints("palladio", -10, "Litt over målet");
        } else {
          addPoints("palladio", 45, "Premium opplevelse verdt investeringen");
          addPoints("corsica", 30, "Høy kvalitet");
          addPoints("jamaica", 10, "God, men kanskje for enkel?");
        }
        break;

      case "location":
        if (answer.value === "coastal") {
          addPoints("jamaica", 30, "Vindklasse 15 m/s - robust konstruksjon");
          addPoints("corsica", 30, "Vindklasse 15 m/s + kassettbeskyttelse");
          addPoints("palladio", -10, "Vindklasse 12 m/s - kan være for svak");
        } else if (answer.value === "suburban") {
          addPoints("corsica", 20, "God beskyttelse mot standard vær");
          addPoints("palladio", 20, "Elegant løsning for normalt miljø");
          addPoints("jamaica", 20, "Pålitelig i de fleste omgivelser");
        } else {
          addPoints("palladio", 25, "Perfekt for beskyttede områder");
          addPoints("corsica", 20, "Mer beskyttelse enn nødvendig, men flott");
          addPoints(
            "jamaica",
            15,
            "God løsning, kanskje overkill med kassett?",
          );
        }
        break;
    }
  });

  // Calculate match percentage based on max possible score
  const maxScore = 150; // Approximate max
  matches.forEach((match) => {
    match.matchPercentage = Math.min(
      100,
      Math.max(0, Math.round((match.score / maxScore) * 100)),
    );
  });

  return matches.sort((a, b) => b.score - a.score);
}

// ============================================================================
// COMPONENTS - Premium visual design with shadcn colors only
// ============================================================================

const ProgressDots = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <motion.div
          key={idx}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            idx <= current ? "w-8 bg-primary" : "w-1.5 bg-muted"
          }`}
          initial={false}
          animate={{
            width: idx <= current ? 32 : 6,
            backgroundColor: idx <= current ? "var(--primary)" : "var(--muted)",
          }}
        />
      ))}
    </div>
  );
};

const OptionButton = ({
  option,
  selected,
  onClick,
  index,
}: {
  option: Question["options"][0];
  selected: boolean;
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        group relative w-full text-left p-6 rounded-xl border-2 transition-all duration-300
        ${
          selected
            ? "border-primary bg-primary/5 shadow-lg"
            : "border-border bg-card hover:border-primary/50 hover:shadow-md"
        }
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Selection indicator */}
      <div
        className={`
        absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
        transition-all duration-300
        ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30 text-transparent"
        }
      `}
      >
        <CheckCircle2 className="w-4 h-4" />
      </div>

      {/* Highlight badge */}
      {option.highlight && (
        <span
          className={`
          inline-block px-2 py-0.5 rounded text-xs font-medium mb-3
          ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
        `}
        >
          {option.highlight}
        </span>
      )}

      <h3 className="text-lg font-semibold text-foreground mb-1 pr-8">
        {option.label}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {option.description}
      </p>

      {/* Hover arrow */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <ArrowRight className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.button>
  );
};

const ResultCard = ({ match, rank }: { match: ProductMatch; rank: number }) => {
  const isWinner = rank === 0;
  const isRunnerUp = rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.15, type: "spring", stiffness: 100 }}
      className={`
        relative rounded-2xl overflow-hidden border-2 transition-all duration-500
        ${
          isWinner
            ? "border-primary bg-gradient-to-br from-primary/5 via-background to-background shadow-2xl scale-105 z-10"
            : isRunnerUp
              ? "border-border bg-card shadow-lg"
              : "border-border/50 bg-card/50 shadow"
        }
      `}
    >
      {/* Rank badge */}
      <div
        className={`
        absolute top-0 left-0 px-4 py-2 rounded-br-2xl font-bold text-sm
        ${
          isWinner
            ? "bg-primary text-primary-foreground"
            : isRunnerUp
              ? "bg-muted text-muted-foreground"
              : "bg-muted/50 text-muted-foreground"
        }
      `}
      >
        {isWinner ? (
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            Din Match
          </span>
        ) : (
          `#${rank + 1} Alternativ`
        )}
      </div>

      {/* Match percentage */}
      <div className="absolute top-4 right-4">
        <div
          className={`
          w-16 h-16 rounded-full flex items-center justify-center border-4
          ${isWinner ? "border-primary/20" : "border-muted"}
        `}
        >
          <div className="text-center">
            <span
              className={`
              block text-lg font-bold leading-none
              ${isWinner ? "text-primary" : "text-muted-foreground"}
            `}
            >
              {match.matchPercentage}%
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">
              Match
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="relative w-full md:w-48 h-48 bg-muted/30 rounded-xl flex-shrink-0 overflow-hidden">
            <Image
              src={match.image}
              alt={match.name}
              fill
              className="object-contain p-4"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {match.name}
            </h3>
            <p className="text-muted-foreground mb-4">{match.tagline}</p>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">
                {match.priceFrom.toLocaleString("nb-NO")} kr
              </span>
              <span className="text-sm text-muted-foreground">fra</span>
            </div>

            {/* Why this matches */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Hvorfor denne passer deg
              </p>
              <ul className="space-y-1.5">
                {match.reasons.slice(0, 2).map((reason, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/produkter/${match.slug}`}
            className={`
              flex-1 text-center py-3 rounded-lg font-medium transition-all
              ${
                isWinner
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }
            `}
          >
            Se detaljer
          </Link>
          <Link
            href={`/konfigurator?product=${match.slug}`}
            className="flex-1 border-2 border-primary text-primary text-center py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
          >
            Konfigurer
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const IntroScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6"
      >
        <Sparkles className="w-10 h-10 text-primary" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Finn din perfekte markise
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-md mb-8"
      >
        Fire spørsmål som hjelper deg å finne den ideelle løsningen for din
        terrasse
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onStart}
        className="group relative bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <span className="flex items-center gap-2">
          Start veileder
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-muted-foreground"
      >
        Tar ca. 1 minutt
      </motion.p>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BefaringsVeileder() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[step];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id,
  );
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleAnswer = useCallback(
    (value: string | boolean) => {
      setAnswers((prev) => {
        const filtered = prev.filter(
          (a) => a.questionId !== currentQuestion.id,
        );
        return [...filtered, { questionId: currentQuestion.id, value }];
      });

      // Auto-advance after selection with delay for visual feedback
      setTimeout(() => {
        if (step < QUESTIONS.length - 1) {
          setStep((s) => s + 1);
        } else {
          setShowResults(true);
        }
      }, 400);
    },
    [currentQuestion, step],
  );

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }, [step]);

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setShowResults(false);
    setStarted(false);
  }, []);

  const matches = useMemo(() => {
    if (!showResults) return [];
    return calculateMatches(answers);
  }, [answers, showResults]);

  if (!started) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <IntroScreen onStart={() => setStarted(true)} />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Vi fant din match!
          </h2>
          <p className="text-muted-foreground">
            Basert på dine preferanser anbefaler vi:
          </p>
        </motion.div>

        <div className="space-y-6">
          {matches.map((match, idx) => (
            <ResultCard key={match.slug} match={match} rank={idx} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Start på nytt
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Header with progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`
              flex items-center gap-1 text-sm font-medium transition-colors
              ${
                step === 0
                  ? "text-muted cursor-not-allowed"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            Tilbake
          </button>

          <ProgressDots current={step} total={QUESTIONS.length} />

          <span className="text-sm text-muted-foreground">
            {step + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 bg-primary/10 rounded-lg text-primary">
                {currentQuestion.icon}
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Spørsmål {step + 1}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
          </div>

          {/* Options grid */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, idx) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={currentAnswer?.value === option.value}
                onClick={() => handleAnswer(option.value)}
                index={idx}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
