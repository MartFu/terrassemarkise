import { Container } from "@/components/ui/container";
import {
  CardLockup,
  ContentLockup,
  HeroLockup,
  SectionLockup,
} from "@/components/ui/content-lockup";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export default function Page() {
  // return null;

  return (
    <>
      <Section>
        <Container className="space-y-20 bg-secondary/30 py-12">
          <Heading level="h2">Typography</Heading>

          <div className="space-y-8">
            <Heading level="h1" className="bg-red-500/5 dark:bg-red-500/10">
              Heading 1
            </Heading>
            <Heading level="h2" className="bg-red-500/5 dark:bg-red-500/10">
              Heading 2
            </Heading>
            <Heading level="h3" className="bg-red-500/5 dark:bg-red-500/10">
              Heading 3
            </Heading>
            <Heading level="h4" className="bg-red-500/5 dark:bg-red-500/10">
              Heading 4
            </Heading>
            <Heading level="h5" className="bg-red-500/5 dark:bg-red-500/10">
              Heading 5
            </Heading>
            <Heading level="h6" className="bg-red-500/5 dark:bg-red-500/10">
              Heading 6
            </Heading>
          </div>

          <div className="space-y-8">
            <Text size="xl" className="bg-red-500/5 dark:bg-red-500/10">
              This is an extra large paragraph
            </Text>
            <Text size="lg" className="bg-red-500/5 dark:bg-red-500/10">
              This is a large paragraph
            </Text>
            <Text size="base" className="bg-red-500/5 dark:bg-red-500/10">
              This is the default paragraph size
            </Text>
            <Text size="sm" className="bg-red-500/5 dark:bg-red-500/10">
              This is a small paragraph
            </Text>
            <Text size="xs" className="bg-red-500/5 dark:bg-red-500/10">
              This is an extra small paragraph
            </Text>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-20 bg-secondary/30 py-12">
          <Heading level="h2">Content Lockup</Heading>
          <HeroLockup
            eyebrow="Hero"
            heading="Hero Heading"
            paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque."
          />

          <SectionLockup
            eyebrow="Section"
            heading="Section Heading"
            paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque."
          />

          <CardLockup
            eyebrow="Eyebrow"
            heading="Heading"
            paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque."
          />

          <div className="max-w-sm bg-card border p-6">
            <CardLockup
              eyebrow="Card"
              heading="Heading"
              paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
