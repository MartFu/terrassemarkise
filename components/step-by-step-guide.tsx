// components/guides/immersive-guide.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Maximize2,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  tips?: string[];
  warnings?: string[];
  duration?: string;
}

export interface GuideMetadata {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

interface ImmersiveGuideProps {
  metadata: GuideMetadata;
  steps: GuideStep[];
  onClose?: () => void;
  onComplete?: () => void;
}

export function ImmersiveGuide({
  metadata,
  steps,
  onClose,
  onComplete,
}: ImmersiveGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const goToStep = useCallback(
    (newIndex: number) => {
      if (newIndex > currentStep) setDirection("next");
      else if (newIndex < currentStep) setDirection("prev");

      setCurrentStep(newIndex);

      // Reset direction after animation
      setTimeout(() => setDirection(null), 300);
    },
    [currentStep],
  );

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) goToStep(currentStep + 1);
    else onComplete?.();
  }, [currentStep, steps.length, goToStep, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextStep();
      if (e.key === "ArrowLeft") prevStep();
      if (e.key === "Escape" && !isImageOpen) onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep, onClose, isImageOpen]);

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextStep();
      else prevStep();
    }
    setTouchStart(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background md:relative md:inset-auto md:h-full">
      {/* Progress Bar - Ultra thin, fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted md:absolute">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header - Minimal, floating */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-sm font-medium text-foreground truncate">
              {metadata.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {metadata.category} • {currentStep + 1}/{steps.length}
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-xs shrink-0">
          {step.duration || `${Math.round(progress)}%`}
        </Badge>
      </header>

      {/* Main Content - Takes remaining space */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden md:overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-full flex flex-col md:flex-row">
          {/* Image Section - Large on mobile, collapses on desktop */}
          {step.imageUrl && (
            <div className="relative w-full md:w-1/2 md:h-full bg-muted shrink-0">
              <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
                <DialogTrigger asChild>
                  <button className="w-full h-full group relative focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                    <img
                      src={step.imageUrl}
                      alt={step.imageAlt || step.title}
                      className={cn(
                        "w-full h-64 md:h-full object-cover transition-transform duration-500",
                        direction === "next" && "translate-x-4 opacity-0",
                        direction === "prev" && "-translate-x-4 opacity-0",
                      )}
                    />
                    {/* Expand indicator */}
                    <div className="absolute bottom-3 right-3 p-2 bg-background/90 backdrop-blur rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity md:opacity-0">
                      <Maximize2 className="w-4 h-4 text-foreground" />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-none w-screen h-[90svh] p-8 border-0 bg-background/95 backdrop-blur-xl">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={step.imageUrl}
                      alt={step.imageAlt || step.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Content Section */}
          <div
            className={cn(
              "flex-1 flex flex-col px-4 py-4 md:px-8 md:py-8 md:overflow-y-auto",
              !step.imageUrl &&
                "md:items-center md:justify-center md:max-w-2xl md:mx-auto",
            )}
          >
            <div
              className={cn(
                "space-y-4 md:space-y-6",
                !step.imageUrl && "md:text-center",
              )}
            >
              {/* Step Title */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Steg {currentStep + 1}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {step.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                {step.description}
              </p>

              {/* Alerts - Compact inline style */}
              {step.warnings && step.warnings.length > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {step.warnings.map((w, i) => (
                      <p key={i} className="text-sm text-destructive/90">
                        {w}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {step.tips && step.tips.length > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {step.tips.map((t, i) => (
                      <p key={i} className="text-sm text-foreground/80">
                        {t}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Spacer to push nav down */}
            <div className="flex-1 min-h-8" />

            {/* Navigation - Fixed bottom on mobile, natural flow on desktop */}
            <div className="sticky bottom-0 md:static bg-background/95 backdrop-blur md:bg-transparent py-4 md:py-0 -mx-4 px-4 md:mx-0 md:px-0 border-t border-border/50 md:border-0 mt-4">
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="gap-1 text-muted-foreground hover:text-foreground disabled:opacity-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Forrige</span>
                </Button>

                {/* Dots indicator - Mobile only */}
                <div className="flex items-center gap-1.5 md:hidden">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => goToStep(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === currentStep
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>

                {/* Step counter - Desktop only */}
                <span className="hidden md:block text-sm text-muted-foreground">
                  {currentStep + 1} / {steps.length}
                </span>

                <Button size="sm" onClick={nextStep} className="gap-1">
                  <span className="hidden sm:inline">
                    {currentStep === steps.length - 1 ? "Fullfør" : "Neste"}
                  </span>
                  {currentStep === steps.length - 1 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper for sidebar inset integration
export function StepByStepGuide({
  metadata,
  steps,
  onComplete,
}: {
  metadata: GuideMetadata;
  steps: GuideStep[];
  onComplete?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Clock className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{metadata.title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {steps.length} trinn •{" "}
            {metadata.difficulty === "easy"
              ? "Enkel"
              : metadata.difficulty === "medium"
                ? "Middels"
                : "Vanskelig"}
          </p>
        </div>
        <Button onClick={() => setIsOpen(true)} size="lg" className="gap-2">
          Start veiledning
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <ImmersiveGuide
      metadata={metadata}
      steps={steps}
      onClose={() => setIsOpen(false)}
      onComplete={() => {
        setIsOpen(false);
        onComplete?.();
      }}
    />
  );
}
