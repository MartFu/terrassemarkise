import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ContactInfo } from "@/innhold/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Text } from "./typography";

interface ContactCardProps {
  contact: ContactInfo;
  variant?: "compact" | "full";
}

export function ContactCard({ contact, variant = "full" }: ContactCardProps) {
  const items = [
    {
      icon: MapPin,
      label: "Adresse",
      value: `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`,
    },
    {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "E-post",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    ...(variant === "full"
      ? [
          {
            icon: Clock,
            label: "Åpningstider",
            value: `Man–Fre: ${contact.hours.weekdays}`,
          },
        ]
      : []),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontaktinformasjon</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <Text size="sm" color="muted" className="block">
                {item.label}
              </Text>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.value}
                </a>
              ) : (
                <Text weight="medium">{item.value}</Text>
              )}
            </div>
          </div>
        ))}
        {contact.orgNumber && (
          <div className="pt-4 border-t border-border">
            <Text size="sm" color="muted">
              Org.nr: {contact.orgNumber}
            </Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
