"use client";

import { useState } from "react";

import { Send, CheckCircle } from "lucide-react";
import { Link } from "./ui/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Text } from "./ui/typography";
import { Input } from "./ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    console.log("FORM DATA: ", formData);
    onSubmit?.(formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <CardTitle className="mb-2">Takk for din henvendelse!</CardTitle>
          <Text color="muted">
            Vi har mottatt meldingen din og vil svare deg så snart som mulig,
            normalt innen 1-2 virkedager.
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send oss en melding</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="input-field-name">Navn</FieldLabel>
              <Input
                id="input-field-name"
                name="input-field-name"
                required
                placeholder="Ola Nordmann"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-email">E-post</FieldLabel>
              <Input
                id="input-field-email"
                name="email"
                type="email"
                required
                placeholder="ola@example.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="input-field-company">
                Bedrift (valgfritt)
              </FieldLabel>

              <Input
                id="input-field-company"
                name="company"
                placeholder="Din bedrift AS"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="input-field-phone">
                Telefon (valgfritt)
              </FieldLabel>

              <Input
                id="input-field-phone"
                name="phone"
                type="tel"
                placeholder="+47 123 45 678"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-subject">Emne</FieldLabel>
              <Select name="subject" defaultValue={"general"} required>
                <SelectTrigger id="input-field-subject">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectLabel>Kunde</SelectLabel>
                    <SelectItem value="general">
                      Generell henvendelse
                    </SelectItem>
                    <SelectItem value="sales">Salgsforespørsel</SelectItem>
                    <SelectItem value="support">Kundestøtte</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Samarbeid</SelectLabel>
                    <SelectItem value="partnership">Partnere</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-message">Melding</FieldLabel>

              <Textarea
                id="input-field-message"
                name="message"
                required
                placeholder="Fortell oss om ditt prosjekt eller still et spørsmål..."
                maxLength={1000}
                rows={5}
              />
              <FieldDescription>Maks 1000 tegn</FieldDescription>
            </Field>
            <Field orientation={"horizontal"}>
              <Checkbox
                id="input-field-privacy"
                name="privacy"
                required
                className="mt-1 rounded border-input"
              />
              <FieldContent>
                <FieldLabel htmlFor="input-field-privacy">
                  Personvern
                </FieldLabel>

                <FieldDescription>
                  Jeg godtar at mine opplysninger lagres i henhold til vår{" "}
                  <Link href="/juridisk/personvern">personvernerklæring</Link>.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              "Sender..."
            ) : (
              <>
                Send melding
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
