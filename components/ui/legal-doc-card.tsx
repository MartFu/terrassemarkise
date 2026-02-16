import { FileText, Shield, Cookie, Eye, Lock } from "lucide-react";
import Link from "next/link";
import type { LegalDoc } from "@/innhold/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Text } from "./typography";

const iconMap = {
  privacy: Shield,
  terms: FileText,
  cookies: Cookie,
  accessibility: Eye,
  security: Lock,
};

const typeLabels = {
  privacy: "Personvern",
  terms: "Vilkår",
  cookies: "Informasjonskapsler",
  accessibility: "Tilgjengelighet",
  security: "Sikkerhet",
};

interface LegalDocCardProps {
  doc: LegalDoc;
}

export function LegalDocCard({ doc }: LegalDocCardProps) {
  const Icon = iconMap[doc.type];
  const formattedDate = new Date(doc.lastUpdated).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/juridisk/${doc.slug}`} className="group block">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {typeLabels[doc.type]}
            </span>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {doc.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text size="sm" color="muted">
            Sist oppdatert: {formattedDate}
          </Text>
          <Text size="xs" color="muted" className="mt-1">
            Versjon {doc.version}
          </Text>
        </CardContent>
      </Card>
    </Link>
  );
}
