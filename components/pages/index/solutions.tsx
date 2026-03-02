"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Hotspot = {
  x: number;
  y: number;
  label: string;
  body: string;
};

type Variant = {
  tag: string;
  image: string;
  hotspots: Hotspot[];
};

type AwningModel = {
  id: string;
  index: number;
  model: string;
  title: string;
  shortTitle: string;
  description: string;
  extendedDescription: string;
  price: string;
  priceNote?: string;
  variants: Variant[];
  images: GalleryImage[];
};

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
};

// ─── Content ──────────────────────────────────────────────────────────────────

const AWNING_MODELS: AwningModel[] = [
  {
    id: "jamaica",
    index: 0,
    model: "Jamaica",
    title: "Åpen markise",
    shortTitle: "Åpen",
    description: "Arkitektur i seg selv. Synlig mekanisme, ren silhuett.",
    extendedDescription:
      "Monteres mot vegg eller tak — også i trange nisjer og under takutspring der en kassett ikke ville passet. Enkel, effektiv og synlig. Duken rulles rundt en åpen profil som gir klassisk karakter.",
    price: "fra kr 8\u202f152,-",
    priceNote: "Toppdeksel: + kr 2\u202f972,-",
    variants: [
      {
        tag: "Uten toppdeksel",
        image: "/assets/product-images/jamaica-illustrasjon-2.webp",
        hotspots: [
          {
            x: 84,
            y: 18,
            label: "Åpen rulleprofil",
            body: "Synlig profil gir klassisk silhuett og enkel tilgang for service.",
          },
          {
            x: 60,
            y: 60,
            label: "Artikulerte armer",
            body: "Konstant fjærspenning holder duken stram i alle posisjoner.",
          },
          {
            x: 20,
            y: 84,
            label: "Frontprofil",
            body: "Nedsenkbar front blokkerer lav kveldssol.",
          },
        ],
      },
      {
        tag: "Med toppdeksel",
        image: "/assets/product-images/jamaica-illustrasjon-toppdeksel.webp",
        hotspots: [
          {
            x: 70,
            y: 12,
            label: "Toppdeksel",
            body: "Presist aluminiumdeksel beskytter mekanismen uten å endre uttrykket.",
          },
          {
            x: 60,
            y: 60,
            label: "Artikulerte armer",
            body: "Konstant fjærspenning holder duken stram i alle posisjoner.",
          },
          {
            x: 20,
            y: 84,
            label: "Frontprofil",
            body: "Nedsenkbar front blokkerer lav kveldssol.",
          },
        ],
      },
    ],
    images: [
      {
        id: "j1",
        src: "/assets/references/jamaica/2x-jamaica-montert-utrullet-hvit-fasade.webp",
        alt: "Jamaica på hvit fasade",
        width: 300,
        height: 169,
        title: "Jamaica",
      },
      {
        id: "j2",
        src: "/assets/references/jamaica/jamaica-toppdeksel-montert-hvit-fasade.webp",
        alt: "Jamaica med toppdeksel",
        width: 300,
        height: 169,
        title: "Jamaica",
      },
      {
        id: "j3",
        src: "/assets/references/jamaica/jamaica-toppdeksel-profil.webp",
        alt: "Jamaica profil",
        width: 300,
        height: 169,
        title: "Jamaica",
      },
    ],
  },
  {
    id: "palladio",
    index: 1,
    model: "Palladio",
    title: "Halvkassett",
    shortTitle: "Halvkassett",
    description: "Mekanismen beskyttet. Armene eksponert.",
    extendedDescription:
      "Duken trekkes inn i en lukket kassett mens armene foldes langs fasaden. Et gjennomtenkt kompromiss mellom diskresjon og pris — robust nok for norsk klima.",
    price: "fra kr 11\u202f164,–",
    variants: [
      {
        tag: "Standard",
        image: "/assets/product-images/palladio-illustrasjon.webp",
        hotspots: [
          {
            x: 84,
            y: 8,
            label: "Halvkassett",
            body: "Duk og rulleaksel innkapslet i lukket aluminium.",
          },
          {
            x: 28,
            y: 72,
            label: "Eksponerte armer",
            body: "Foldes langs fasaden, enkle å vedlikeholde.",
          },
          {
            x: 74,
            y: 64,
            label: "Frontliste",
            body: "Slank profil holder dukkanten stram.",
          },
        ],
      },
    ],
    images: [
      {
        id: "p1",
        src: "/assets/references/palladio/palladio-3.webp",
        alt: "Palladio i utekrok",
        width: 300,
        height: 169,
        title: "Palladio",
      },
      {
        id: "p2",
        src: "/assets/references/palladio/palladio-4.webp",
        alt: "Palladio med flagg",
        width: 300,
        height: 169,
        title: "Palladio",
      },
      {
        id: "p3",
        src: "/assets/references/palladio/palladio-montert-utrullet-sort-fasade.webp",
        alt: "Palladio på sort fasade",
        width: 300,
        height: 169,
        title: "Palladio",
      },
    ],
  },
  {
    id: "corsica",
    index: 2,
    model: "Corsica",
    title: "Helkassett",
    shortTitle: "Helkassett",
    description: "Alt forsvinner. Full beskyttelse, full integrasjon.",
    extendedDescription:
      "Duk, armer og mekanisme trekkes inn i én forseglet kassett. Fasaden forblir urørt. Med integrert LED-belysning for kveldssamvær uten ekstra installasjoner.",
    price: "fra kr 14\u202f845,-",
    variants: [
      {
        tag: "Standard",
        image: "/assets/product-images/corsica-illustrasjon.webp",
        hotspots: [
          {
            x: 90,
            y: 14,
            label: "Forseglet kassett",
            body: "Full innkapsling. Kassetten børster støv av duken ved innrulling.",
          },
          {
            x: 25,
            y: 58,
            label: "Innkapslete armer",
            body: "Ledd og fjærsystem alltid beskyttet — lengre levetid.",
          },
          {
            x: 83,
            y: 58,
            label: "Integrert LED",
            body: "Diskret belysning bygget inn i profilen.",
          },
        ],
      },
    ],
    images: [
      {
        id: "c1",
        src: "/assets/references/corsica/corsica-1.webp",
        alt: "Corsica underside",
        width: 300,
        height: 169,
        title: "Corsica",
      },
      {
        id: "c2",
        src: "/assets/references/corsica/corsica-2.webp",
        alt: "Corsica på terrasse",
        width: 300,
        height: 169,
        title: "Corsica",
      },
      {
        id: "c3",
        src: "/assets/references/corsica/corsica-utrullet-underside-hvit-fasade.webp",
        alt: "Corsica utrullet",
        width: 300,
        height: 169,
        title: "Corsica",
      },
    ],
  },
];

const FABRICS = [
  { id: "white", name: "01 Hvit", color: "#F7F7F5" },
  { id: "cream", name: "02 Krem", color: "#F2EFE9" },
  { id: "sand", name: "03 Sand", color: "#E5E0D5" },
  { id: "grey", name: "04 Lys grå", color: "#C5C5C3" },
  { id: "charcoal", name: "05 Mørk grå", color: "#4A4A4A" },
  { id: "anthracite", name: "06 Antrasitt", color: "#2E2E2E" },
  { id: "beige", name: "07 Beige", color: "#D4C8B8" },
  { id: "taupe", name: "08 Taupe", color: "#8B7E72" },
  { id: "blue", name: "09 Marine", color: "#2C3E50" },
  { id: "green", name: "10 Skog", color: "#3D4A3A" },
  { id: "terracotta", name: "11 Terrakotta", color: "#B87064" },
  { id: "ochre", name: "12 Okker", color: "#C4A77D" },
];

const FRAMES = [
  { id: "white", name: "Hvit", color: "#FAFAFA" },
  { id: "cream", name: "Krem", color: "#F5F5DC" },
  { id: "silver", name: "Sølv", color: "#C0C0C0" },
  { id: "anthracite", name: "Antrasitt", color: "#383838" },
  { id: "black", name: "Sort", color: "#1A1A1A" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function GalleryDrawer({
  isOpen,
  onClose,
  images,
  modelName,
}: {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  modelName: string;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="h-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Referanser
                </p>
                <h2 className="text-3xl font-light">{modelName}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-[4/3] relative overflow-hidden bg-secondary group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolutionsSection() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[3]);

  const currentModel = AWNING_MODELS[activeModel];
  const currentVariant = currentModel.variants[activeVariant];

  const nextModel = () => {
    setActiveModel((prev) => (prev + 1) % AWNING_MODELS.length);
    setActiveVariant(0);
    setActiveHotspot(null);
  };

  const prevModel = () => {
    setActiveModel(
      (prev) => (prev - 1 + AWNING_MODELS.length) % AWNING_MODELS.length,
    );
    setActiveVariant(0);
    setActiveHotspot(null);
  };

  return (
    <section className="h-[calc(100vh-var(--header-heigh))] bg-background relative overflow-hidden">
      {/* Top Navigation - Minimal */}
      <nav className="absolute top-0 left-0 right-0 z-30 px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-baseline gap-8">
            {AWNING_MODELS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModel(idx);
                  setActiveVariant(0);
                  setActiveHotspot(null);
                }}
                className={cn(
                  "text-xs uppercase tracking-[0.15em] transition-colors duration-300 relative",
                  activeModel === idx
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70",
                )}
              >
                {m.model}
                {activeModel === idx && (
                  <motion.div
                    layoutId="activeModel"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="tracking-[0.1em]">
              {String(activeModel + 1).padStart(2, "0")} /{" "}
              {String(AWNING_MODELS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="h-[calc(100vh-var(--header-heigh))] grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column - Text Content */}
        <div className="lg:col-span-4 flex flex-col justify-center px-6 md:px-12 py-24 lg:py-0 order-2 lg:order-1">
          <motion.div
            key={currentModel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm"
          >
            {/* Model Title */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {currentModel.title}
              </p>
              <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4">
                {currentModel.description}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentModel.extendedDescription}
              </p>
            </div>

            {/* Variant Toggle (if applicable) */}
            {currentModel.variants.length > 1 && (
              <div className="mb-8">
                <div className="flex gap-2">
                  {currentModel.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveVariant(idx);
                        setActiveHotspot(null);
                      }}
                      className={cn(
                        "px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-300",
                        activeVariant === idx
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground/50",
                      )}
                    >
                      {v.tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hotspots List */}
            <div className="space-y-0 border-t border-border">
              {currentVariant.hotspots.map((hotspot, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    setActiveHotspot(activeHotspot === idx ? null : idx)
                  }
                  className={cn(
                    "w-full py-4 border-b border-border text-left flex items-start gap-4 transition-colors duration-200 group",
                    activeHotspot === idx
                      ? "bg-secondary/30"
                      : "hover:bg-secondary/20",
                  )}
                >
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 mt-0.5 transition-colors duration-200",
                      activeHotspot === idx
                        ? "border-foreground bg-foreground text-background"
                        : "border-border group-hover:border-foreground/50",
                    )}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium block mb-1">
                      {hotspot.label}
                    </span>
                    <AnimatePresence>
                      {activeHotspot === idx && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-xs text-muted-foreground leading-relaxed overflow-hidden"
                        >
                          {hotspot.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-2xl font-light mb-1">{currentModel.price}</p>
              {currentModel.priceNote && (
                <p className="text-xs text-muted-foreground">
                  {currentModel.priceNote}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Center Column - Product Image */}
        <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 min-h-[50vh] lg:min-h-screen bg-secondary/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Product Image Container */}
          <div className="relative w-full max-w-lg mx-auto px-8 py-12">
            <motion.div
              key={`${currentModel.id}-${activeVariant}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square"
            >
              {/* Main Image */}
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${currentVariant.image}')` }}
              />

              {/* Color Overlay Simulation */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedFabric.color }}
              />

              {/* Hotspots */}
              {currentVariant.hotspots.map((hotspot, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    setActiveHotspot(activeHotspot === idx ? null : idx)
                  }
                  className={cn(
                    "absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                    activeHotspot === idx ? "z-20" : "z-10 hover:scale-110",
                  )}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <span
                    className={cn(
                      "w-full h-full rounded-full border flex items-center justify-center text-xs transition-all duration-300",
                      activeHotspot === idx
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background/80 backdrop-blur-sm border-border hover:border-foreground",
                    )}
                  >
                    {idx + 1}
                  </span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Gallery Link */}
          <button
            onClick={() => setGalleryOpen(true)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Se referansebilder</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Right Column - Configuration */}
        <div className="lg:col-span-3 flex flex-col justify-center px-6 md:px-8 py-12 lg:py-0 border-l border-border order-3">
          <div className="max-w-xs mx-auto lg:mx-0 w-full space-y-12">
            {/* Fabric Selection */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Duk
              </p>
              <div className="grid grid-cols-4 gap-2">
                {FABRICS.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className={cn(
                      "aspect-square border transition-all duration-200 relative group",
                      selectedFabric.id === fabric.id
                        ? "border-foreground"
                        : "border-border hover:border-foreground/50",
                    )}
                    style={{ backgroundColor: fabric.color }}
                    title={fabric.name}
                  >
                    {selectedFabric.id === fabric.id && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center",
                            ["white", "cream", "sand"].includes(fabric.id)
                              ? "border-foreground text-foreground"
                              : "border-background text-background",
                          )}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                        </span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {selectedFabric.name}
              </p>
            </div>

            {/* Frame Selection */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Konstruksjon
              </p>
              <div className="space-y-2">
                {FRAMES.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={cn(
                      "w-full flex items-center gap-3 py-2 transition-colors duration-200 group",
                      selectedFrame.id === frame.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-border shrink-0"
                      style={{ backgroundColor: frame.color }}
                    />
                    <span className="text-xs uppercase tracking-wider">
                      {frame.name}
                    </span>
                    {selectedFrame.id === frame.id && (
                      <motion.div
                        layoutId="selectedFrame"
                        className="ml-auto w-1 h-1 rounded-full bg-foreground"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 pt-8 border-t border-border">
              <button
                onClick={prevModel}
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                aria-label="Forrige modell"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextModel}
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                aria-label="Neste modell"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground ml-auto uppercase tracking-wider">
                {currentModel.shortTitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Drawer */}
      <GalleryDrawer
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={currentModel.images}
        modelName={currentModel.model}
      />
    </section>
  );
}
