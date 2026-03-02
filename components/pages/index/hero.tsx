import { HomePageContent } from "@/app/page";
import { Container } from "@/components/ui/container";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

export default function HeroSection({
  content,
}: {
  content: HomePageContent["hero"];
}) {
  return (
    <section
      id="hero"
      className="relative h-[calc(100svh-var(--header-height))] bg-secondary"
    >
      <div
        className={cn("absolute inset-0 z-1")}
        style={{
          backgroundImage: `url(${content.imageSrc})`,
          backgroundSize: content.imageSize,
          backgroundPosition: content.imagePosition,
          backgroundRepeat: content.imageRepeat,
        }}
      />
      <div className="absolute top-0 inset-x-0 h-[24vh] bg-linear-to-b from-black/80 to-transparent z-2" />
      <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-linear-to-t from-black dark:from-background to-transparent z-2" />

      <Container className="relative z-3 h-full pb-8 md:pb-12 text-neutral-50">
        <Stack
          className="h-full pb-4"
          space={{ base: 2, md: 4, lg: 20 }}
          direction={{ base: "col", lg: "row" }}
          align={{ base: "start", lg: "end" }}
          justify={{ base: "end", lg: "between" }}
        >
          <h1 className="text-3xl text-nowrap md:text-5xl">
            {content.title.map((part, idx) => (
              <Fragment key={`hero-title-${idx}`}>
                <span>{part}</span>
                {idx < content.title.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>
          <p className="text-lg text-wrap max-w-[48ch] text-neutral-100">
            {content.description}
          </p>
        </Stack>
      </Container>
    </section>
  );
}
