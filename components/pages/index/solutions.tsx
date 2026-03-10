"use client";

import { Slide } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EXTERNAL_URLS, SITE_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment, useState } from "react";

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  title: string | readonly string[];
  slides: Slide[];
}

export function SolutionsSection({ title, slides }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const slide = slides[activeSlide];
  const variantIdx = Math.min(activeVariant, slide.variants.length - 1);
  const variant = slide.variants[variantIdx];

  function goTo(idx: number) {
    setActiveSlide(idx);
    setActiveVariant(0);
    setActiveHotspot(null);
  }

  function toggleHotspot(i: number) {
    setActiveHotspot(activeHotspot === i ? null : i);
  }

  return (
    <Section spacing="lg">
      <Container className="relative">
        {/* Section heading */}

        <h2 className="text-left md:text-center text-2xl md:text-4xl lg:text-6xl font-light tracking-tight leading-tight mb-4 md:mb-16">
          {typeof title === "string"
            ? title
            : title.map((t, idx) => (
                <Fragment key={`t-${idx}`}>
                  {t}
                  {idx < title.length - 1 && <br />}
                </Fragment>
              ))}
        </h2>

        {/* Model nav */}
        <nav className=" flex justify-between md:border-b border-border mb-2 md:mb-12">
          <div className="flex justify-center gap-1 md:gap-8 -mb-px">
            {slides.map((s) => (
              <button
                key={s.index}
                onClick={() => goTo(s.index)}
                className={cn(
                  "px-3 py-1.5 md:py-0 md:px-0.5 border md:border-0 text-nowrap",
                  "text-[0.6rem] md:text-xs font-mono tracking-widest uppercase transition-colors relative",
                  "md:after:absolute md:after:bottom-px md:after:left-0 md:after:right-0 md:after:h-[1.5px] md:after:bg-foreground md:after:transition-transform md:after:duration-250",
                  activeSlide === s.index
                    ? "text-background bg-foreground md:bg-transparent md:text-foreground after:scale-x-100"
                    : " md:text-muted-foreground after:scale-x-0 hover:text-foreground",
                )}
              >
                {s.type}
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="hidden md:flex gap-2 -mb-px">
            <button
              onClick={() =>
                goTo((activeSlide - 1 + slides.length) % slides.length)
              }
              aria-label="Forrige modell"
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.5 2L3.5 6L7.5 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => goTo((activeSlide + 1) % slides.length)}
              aria-label="Neste modell"
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.5 2L8.5 6L4.5 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Main grid: image left, copy right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-20 items-start">
          {/* LEFT — image + hotspots */}
          <div>
            <div className="relative w-full aspect-square overflow-visible">
              {/* Variant toggle */}
              {slide.variants.length > 1 && (
                <div className="absolute z-10 top-0 left-0 flex gap-2">
                  {slide.variants.map((v, vi) => (
                    <button
                      key={vi}
                      onClick={() => {
                        setActiveVariant(vi);
                        setActiveHotspot(null);
                      }}
                      className={cn(
                        "text-[0.6rem] font-mono tracking-widest uppercase border px-3 py-1.5 transition-all duration-200",
                        variantIdx === vi
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground text-foreground",
                      )}
                    >
                      {v.tag}
                    </button>
                  ))}
                </div>
              )}

              {/* All image layers pre-rendered for instant crossfade */}
              {slides.map((s, si) =>
                s.variants.map((v, vi) => (
                  <div
                    key={`${si}-${vi}`}
                    aria-hidden={!(si === activeSlide && vi === variantIdx)}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${v.image}')`,
                      opacity: si === activeSlide && vi === variantIdx ? 1 : 0,
                    }}
                  />
                )),
              )}

              {/* Hotspot dots */}
              {variant.hotspots.map((h, hi) => {
                const isOn = activeHotspot === hi;
                // Smart popover placement based on position in image
                const popLeft = h.x <= 55 ? "calc(100% + 8px)" : undefined;
                const popRight = h.x > 55 ? "calc(100% + 8px)" : undefined;
                const popTop = h.y <= 62 ? "calc(0% + 6px)" : undefined;
                const popBottom = h.y > 62 ? "calc(0% + 6px)" : undefined;

                return (
                  <div
                    key={hi}
                    role="button"
                    aria-pressed={isOn}
                    aria-label={h.label}
                    onClick={() => toggleHotspot(hi)}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer",
                      isOn ? "z-2" : "z-1",
                    )}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    {/* Ring */}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border border-accent flex items-center justify-center backdrop-blur-sm transition-all duration-200",
                        isOn
                          ? "bg-accent scale-110"
                          : "bg-background/70 hover:bg-accent hover:scale-110 group",
                      )}
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                          isOn
                            ? "bg-background"
                            : "bg-accent group-hover:bg-background",
                        )}
                      />
                    </div>

                    {/* Popover */}
                    {isOn && (
                      <div
                        className="absolute w-52 bg-foreground/80 backdrop-blur-md text-background p-3 pointer-events-none shadow-md select-none rounded"
                        style={{
                          left: popLeft,
                          right: popRight,
                          top: popTop,
                          bottom: popBottom,
                        }}
                      >
                        <p
                          style={{ opacity: 1 }}
                          className="text-[11px] text-accent font-bold tracking-widest uppercase mb-1.5"
                        >
                          {h.label}
                        </p>
                        <p className="text-xs leading-relaxed">{h.body}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — copy */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-baseline gap-4 mb-5">
              <span className="text-[0.6rem] font-mono tracking-widest tabular-nums">
                {String(activeSlide + 1).padStart(2, "0")}&nbsp;/&nbsp;
                {String(slides.length).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-foreground">
                {slide.type}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-light tracking-tight leading-snug mb-5">
              {slide.model}
              <span className="font-bold text-muted-foreground mx-2">|</span>

              {slide.title}
            </h3>

            <hr className="border-border mb-5" />

            <p className="text-base font-light leading-relaxed mb-8">
              {slide.description}
            </p>

            {/* Hotspot list — synced with image dots */}
            <div className="hidden md:block mb-8">
              {variant.hotspots.map((h, hi) => {
                const isOn = activeHotspot === hi;
                return (
                  <div
                    key={hi}
                    role="button"
                    aria-pressed={isOn}
                    onClick={() => toggleHotspot(hi)}
                    className={cn(
                      "pl-2 flex gap-3 items-start py-2.5 border-b border-border cursor-pointer transition-all duration-200",
                      isOn ? "bg-accent/10" : "hover:bg-accent/5",
                    )}
                  >
                    <div
                      className={cn(
                        "mt-1 w-2.5 h-2.5 rounded-full border border-accent shrink-0 transition-colors duration-200",
                        isOn && "bg-accent",
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          "text-[0.6rem] tracking-widest uppercase transition-colors duration-200",
                          isOn ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {h.label}
                      </p>
                      {isOn && (
                        <p className="text-sm font-light leading-relaxed mt-1">
                          {h.body}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price */}
            <p className="text-sm font-mono">{slide.price}</p>
            {slide.priceNote && (
              <p className="text-xs font-mono text-muted-foreground mt-1">
                {slide.priceNote}
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-2 mt-8">
              <Button asChild>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    EXTERNAL_URLS.MAIN_DOMAIN_STORE_AWNINGS_TERRACE_AWNINGS +
                    "/" +
                    slide.model.toLowerCase()
                  }
                >
                  Konfigurer i nettbutikken
                </Link>
              </Button>
              <Button asChild variant={"ghost"}>
                <Link href={SITE_URLS.AWNINGS + slide.model.toLowerCase()}>
                  Se detaljer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* {slides.map((s) => {
        const isActive = s.index === activeSlide;

        if (!isActive || !s.images) return null;

        return (
          <div className="py-20 p-20" key={`gallery-${s.index}`}>
            <GalleryGrid
              aspectRatio="video"
              variant="balanced"
              images={s.images}
            />
          </div>
        );
      })} */}
    </Section>
  );
}
