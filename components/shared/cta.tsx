// app/_components/sections/cta.tsx
import Link from "next/link";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "../ui/typography";
import { Section } from "../ui/section";
import { cn } from "@/lib/utils";

export function CTASection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        className,
        "relative isolate overflow-hidden bg-accent py-24 sm:py-32 flex items-center min-h-160 h-[calc(100svh-var(--footer-height)-var(--header-height))]",
      )}
    >
      {/* Abstract pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[40rem] font-bold leading-none text-primary-foreground/20">
          <img src="/assets/logo_icon.png" className="object-fit opacity-50" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            level="h2"
            className="text-3xl font-bold text-primary-foreground! sm:text-4xl lg:text-5xl!"
          >
            Skap deg det perfekte sommerrommet på terrassen!
          </Heading>

          <p className="mt-6 text-lg text-primary-foreground/90">
            Kontakt oss for en uforpliktende prat. Vi hjelper deg!
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="group gap-2"
              asChild
            >
              <Link href="/befaring">
                Besøk nettbutikken
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-primary-foreground"
            >
              <Link href="/kontakt">Snakk med en ekspert</Link>
            </Button>
          </div>

          {/* Contact options */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              69 50 00 00
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              post@solskjerming.no
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat med oss
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
