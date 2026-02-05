import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section>
      <Container className="text-center space-y-4 pt-24">
        <h2 className="text-2xl font-semibold">404 - Siden ble ikke funnet</h2>
        <p className="mb-8">Beklager, vi fant ikke siden du lette etter.</p>
        <Button variant="outline" asChild>
          <Link href="/">Gå tilbake til forsiden</Link>
        </Button>
      </Container>
    </Section>
  );
}
