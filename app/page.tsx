import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function Page() {
  return (
    <>
      {/* Hero */}
      <Section>
        <Container>Hero</Container>
      </Section>

      {/* Subhero */}
      <Section>
        <Container>SubHero</Container>
      </Section>
    </>
  );
}
