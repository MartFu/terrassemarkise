"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ComposableForm, ComposableFormProps } from "../composable-form";
import { Heading, Text } from "../ui/typography";

interface ContactCtaProps {
  title: string;
  description: string;
  keyPoints?: string[];
  formProps: ComposableFormProps;
}

export function ContactCTA({
  title,
  description,
  keyPoints,
  formProps,
  children,
}: React.PropsWithChildren<ContactCtaProps>) {
  return (
    <Section>
      <Container>
        <div className="bg-linear-to-br from-primary/5 to-accent/5 border p-8 lg:p-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-6">
                <Heading className="md:max-w-[20ch]!">{title}</Heading>
                <Text className="max-w-[40ch]!" size="base" color="muted">
                  {description}
                </Text>
                {children}
              </div>

              {keyPoints && keyPoints.length > 0 && (
                <ul className="space-y-3">
                  {keyPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-background border p-6 space-y-4">
              <ComposableForm {...formProps} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
