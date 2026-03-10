import { HomePageContent } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { CheckCircle, MoveRight } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

export default function HeroSection({
  content,
}: {
  content: HomePageContent["hero"];
}) {
  return (
    <section
      id="hero"
      className="relative h-[calc(100svh-var(--header-height))] overflow-hidden bg-secondary"
    >
      {/* Background image */}
      <Image
        className="absolute inset-0 object-cover object-center scale-105"
        src={content.imageSrc}
        loading="eager"
        alt={content.imageAlt}
        fill
        priority
      />

      {/* Layered gradients for depth */}
      <div className="absolute inset-0 bg-black/70 to-transparent z-10" />

      {/* Content */}
      <Container className="relative z-20 h-full flex flex-col justify-end pb-[max(72px,12vh)] text-neutral-50">
        {/* Headline */}
        <h1
          className={cn(
            "font-serif font-light mb-6",
            "text-[clamp(2.8rem,7vw,7rem)]",
            "animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150",
          )}
        >
          {content.title.map((part, idx) => (
            <Fragment key={`hero-title-${idx}`}>
              <span className={cn(idx === 1 ? "italic" : "text-neutral-300")}>
                {part}
              </span>
              {idx < content.title.length - 1 && <br />}
            </Fragment>
          ))}
        </h1>

        {/* Description */}
        <p
          className={cn(
            "text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-[54ch]",
            "mb-10",
            "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300",
          )}
        >
          {content.description}
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-5 flex-wrap mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Button size="lg" className="gap-2 group">
            Se våre markiser
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <button className="text-sm font-medium text-neutral-300 underline underline-offset-4 decoration-neutral-600 hover:text-neutral-50 hover:decoration-neutral-300 transition-colors">
            Bestill gratis befaring
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          {content.trustBadges.map((badge, i) => (
            <span
              key={i}
              className={cn(
                "px-3 py-2.5 flex items-center gap-2",
                "text-[11px] font-medium tracking-widest uppercase",
                "bg-white/5 backdrop-blur-sm border border-white/10",
                "text-neutral-200 hover:bg-white/10 hover:border-white/20 transition-colors",
              )}
            >
              <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
              {badge.label}
            </span>
          ))}
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-[max(24px,5vw)] z-20 flex flex-col items-center gap-2 text-neutral-300">
        <span className="text-[10px] tracking-[0.2em] uppercase [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-12 bg-linear-to-b from-neutral-500/50 to-transparent" />
      </div>
    </section>
  );
}
