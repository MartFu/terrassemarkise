import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import {
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqItem } from "@/innhold/types";
import { Grid } from "../ui/grid";
import { cn } from "@/lib/utils";
import { Stack } from "../ui/stack";

export interface FAQSectionProps {
  faqs: FaqItem[];
  title: string;
  titleColor?: HeadingProps["color"];
  titleLevel?: HeadingProps["as"];
  description?: string;
  descriptionColor?: TextProps["color"];
  decriptionSize?: TextProps["size"];
  defaultFaq?: string;
  className?: string;
}

export function FAQSection({
  faqs,
  title,
  titleColor,
  description,
  descriptionColor,
  decriptionSize,
  titleLevel = "h3",
  defaultFaq,
  className,
  children,
}: React.PropsWithChildren<FAQSectionProps>) {
  return (
    <Section className={className}>
      <Container className="space-y-3">
        <Grid gap={8} cols={{ sm: 1, lg: 2 }}>
          <Stack space={4} className="relative">
            <Heading
              level={titleLevel}
              color={titleColor}
              className="max-w-md text-3xl!"
            >
              {title}
            </Heading>
            {description && (
              <Text
                className="max-w-lg"
                size={decriptionSize}
                color={descriptionColor}
              >
                {description}
              </Text>
            )}
            {children}
          </Stack>
          <Accordion
            className="bg-card/50 px-4 py-2"
            type="single"
            defaultValue={defaultFaq ?? faqs[0]?.question}
            collapsible
          >
            {faqs.map((faq) => (
              <AccordionItem value={faq.question} key={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Grid>
      </Container>
    </Section>
  );
}
