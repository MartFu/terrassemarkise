import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_INFO } from "@/content/company";
import { CONTACT_PAGE_CONTENT } from "@/content/pages/kontakt";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  House,
  Building,
} from "lucide-react";

export default async function Page() {
  return (
    <>
      {/* Hero - Clean and centered */}
      <Section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {CONTACT_PAGE_CONTENT.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              {CONTACT_PAGE_CONTENT.hero.subtitle} —{" "}
              {CONTACT_PAGE_CONTENT.hero.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content - Two column layout */}
      <Section className="py-20 md:py-28 bg-muted/30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Contact Form */}
            <div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-3">
                  {CONTACT_PAGE_CONTENT.contactForm.title}
                </h2>
                <p className="text-muted-foreground">
                  {CONTACT_PAGE_CONTENT.contactForm.description}
                </p>
              </div>

              <form className="space-y-6" id="kontaktskjema">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Navn
                    </label>
                    <Input
                      className="h-11"
                      placeholder={
                        CONTACT_PAGE_CONTENT.contactForm.fields.name.placeholder
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      E-post
                    </label>
                    <Input
                      type="email"
                      className="h-11"
                      placeholder={
                        CONTACT_PAGE_CONTENT.contactForm.fields.email
                          .placeholder
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Telefon
                    </label>
                    <Input
                      type="tel"
                      className="h-11"
                      placeholder={
                        CONTACT_PAGE_CONTENT.contactForm.fields.phone
                          .placeholder
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Emne
                    </label>
                    <select className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">
                        {
                          CONTACT_PAGE_CONTENT.contactForm.fields.subject
                            .placeholder
                        }
                      </option>
                      {CONTACT_PAGE_CONTENT.contactForm.subjects.map(
                        (subject, i) => (
                          <option key={i} value={subject}>
                            {subject}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Melding
                  </label>
                  <Textarea
                    placeholder={
                      CONTACT_PAGE_CONTENT.contactForm.fields.message
                        .placeholder
                    }
                    className="min-h-[140px] resize-none"
                  />
                </div>

                <Button size="lg" className="w-full md:w-auto px-8">
                  Send melding
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-12">
              {/* Benefits */}
              <div>
                <h3 className="text-xl font-bold mb-6">
                  {CONTACT_PAGE_CONTENT.benefits.title}
                </h3>
                <div className="space-y-3">
                  {CONTACT_PAGE_CONTENT.benefits.items.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <svg
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-xl font-bold mb-3">
                  {CONTACT_PAGE_CONTENT.areas.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {CONTACT_PAGE_CONTENT.areas.description}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  * {CONTACT_PAGE_CONTENT.areas.note}
                </p>
              </div>

              {/* Office Info */}
              <div className="rounded-lg border bg-muted/50 p-6 space-y-4">
                <h3 className="font-semibold">Vårt hovedkontor</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{COMPANY_INFO.address}</p>
                      <p className="text-muted-foreground">
                        {COMPANY_INFO.zip} {COMPANY_INFO.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="text-muted-foreground">
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="text-muted-foreground">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="text-muted-foreground">
                      {COMPANY_INFO.orgNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section - Full width, contained */}
      <Section className="py-0 bg-muted/30">
        <Container className="px-0">
          <div className="relative h-[400px] md:h-[500px] bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border shadow-sm">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {COMPANY_INFO.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {COMPANY_INFO.zip} {COMPANY_INFO.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
