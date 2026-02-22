import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AboutContent, aboutContent } from "@/innhold/sider/om-oss";
import { TeamMember } from "@/innhold/types";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Eye,
  Shield,
  Heart,
  Wrench,
  Sun,
  Phone,
  Mail,
  MessageSquare,
  CalendarDays,
  Quote,
} from "lucide-react";

interface AboutHeroProps {
  content: {
    title: string;
    subtitle: string;
    companyBadge: string;
  };
}

export function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-primary/5 to-background">
      {/* Bakgrunnsmønster */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Building2 className="h-4 w-4" />
              <span>{content.companyBadge}</span>
            </div>
          </div>

          {/* Hovedtittel */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {content.title}
          </h1>

          {/* Undertittel */}
          <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl">
            {content.subtitle}
          </p>

          {/* Dekorative elementer */}
          <div className="absolute left-1/2 top-0 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      {/* Bunnlinje */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}

interface CompanyBadgeProps {
  content: {
    name: string;
    established: string;
    location: string;
    employees: string;
    description: string;
    websiteRelation: {
      title: string;
      description: string;
      domain: string;
    };
  };
}

export function CompanyBadge({ content }: CompanyBadgeProps) {
  return (
    <section className="container mx-auto px-4 -mt-12 relative z-20">
      <Card className="border-2 border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">
                  {content.websiteRelation.title}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {content.websiteRelation.description}
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Etablert</span>
                  </div>
                  <p className="font-medium">{content.established}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Lokasjon</span>
                  </div>
                  <p className="font-medium">{content.location}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Ansatte</span>
                  </div>
                  <p className="font-medium">{content.employees}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center border-l border-border pl-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Vi er</p>
                <p className="text-2xl font-bold text-primary">
                  {content.name}
                </p>
                <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                  <span className="text-primary">
                    Organisasjonsnr: 912 345 678
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

interface StorySectionProps {
  content: AboutContent["story"];
}

export function StorySection({ content }: StorySectionProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{content.title}</h2>
        <div className="mx-auto h-1 w-20 rounded-full bg-primary/30" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Venstre kolonne - Historien */}
        <div className="lg:col-span-2 space-y-8">
          {/* Første avsnitt med sitat-stil */}
          <div className="relative rounded-2xl bg-muted/30 p-6 md:p-8">
            <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/10" />
            <p className="text-lg leading-relaxed text-foreground/90">
              {content.paragraphs[0]}
            </p>
          </div>

          {/* Andre avsnitt */}
          <p className="text-muted-foreground leading-relaxed">
            {content.paragraphs[1]}
          </p>

          {/* Tredje avsnitt med utheving */}
          <div className="border-l-4 border-primary bg-primary/5 p-4 md:p-6">
            <p className="italic text-foreground/90">{content.paragraphs[2]}</p>
          </div>

          {/* Fjerde avsnitt */}
          <p className="text-muted-foreground leading-relaxed">
            {content.paragraphs[3]}
          </p>
        </div>

        {/* Høyre kolonne - Grunnlegger-info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-2 border-primary/20 bg-linear-to-b from-background to-primary/5">
            <CardContent className="p-6">
              {/* Grunnlegger header */}
              <div className="mb-6 text-center">
                <Avatar className="mx-auto mb-4 h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    HR
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">
                  {content.founderStory.name}
                </h3>
                <p className="text-primary font-medium">
                  {content.founderStory.role}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {content.founderStory.background}
                </Badge>
              </div>

              {/* Nøkkelinformasjon */}
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-destructive">
                    <CalendarDays className="h-4 w-4" />
                    <span>Utfordringen</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {content.challenge}
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                    <Building2 className="h-4 w-4" />
                    <span>Løsningen</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {content.solution}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Kontorer og lager på Kråkerøy, Fredrikstad</span>
                </div>
              </div>

              {/* Sitat bunn */}
              <div className="mt-6 border-t border-border pt-4 text-center">
                <p className="text-xs italic text-muted-foreground">
                  {'"Vi startet Solskjerming AS for å gjøre en forskjell"'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tidslinje-indikator */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="border-primary/30">
            2013
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="border-primary/30">
            I dag
          </Badge>
          <span className="ml-2">3 ansatte • 500+ kunder</span>
        </div>
      </div>
    </section>
  );
}

interface TeamSectionProps {
  content: {
    title: string;
    description: string;
    members: TeamMember[];
  };
}

export function TeamSection({ content }: TeamSectionProps) {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.members.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="text-center">
                <Avatar className="mx-auto h-24 w-24 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-xl">{member.name}</CardTitle>
                <p className="text-primary font-medium">{member.role}</p>
                {member.education && (
                  <p className="text-sm text-muted-foreground">
                    {member.education}
                  </p>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{member.description}</p>
                {member?.social?.email && (
                  <a
                    href={`mailto:${member?.social?.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {member?.social?.email}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ContactSectionProps {
  content: {
    title: string;
    description: string;
    cta: string;
    buttonText: string;
  };
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <Card className="bg-linear-to-br from-primary/5 via-primary/5 to-background border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl">
            {content.title}
          </CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto">
            {content.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-xl font-medium text-foreground">{content.cta}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Phone className="h-4 w-4" />
              Ring oss
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Send e-post
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat med oss
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>Kontoret: +47 69 00 00 00</p>
            <p>E-post: post@solskjerming.no</p>
            <p>Adresse: Kråkerøyveien 123, 1671 Kråkerøy</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

interface ValuesSectionProps {
  content: {
    title: string;
    coreValues: Array<{
      title: string;
      description: string;
    }>;
  };
}

const iconMap = {
  Åpenhet: Eye,
  "Faglig integritet": Shield,
  Engasjement: Heart,
};

export function ValuesSection({ content }: ValuesSectionProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {content.title}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {content.coreValues.map((value, index) => {
            const Icon = iconMap[value.title as keyof typeof iconMap] || Shield;

            return (
              <Card
                key={index}
                className="text-center transition-all hover:border-primary/50"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ExpertiseSectionProps {
  content: {
    title: string;
    description: string;
    areas: Array<{
      title: string;
      description: string;
    }>;
  };
}

const iconMapExpertise = {
  "Teknisk innsikt": Wrench,
  "Praktisk erfaring": Sun,
  "Helhetlig støtte": Users,
};

export function ExpertiseSection({ content }: ExpertiseSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{content.title}</h2>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          {content.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {content.areas.map((area, index) => {
          const Icon =
            iconMapExpertise[area.title as keyof typeof iconMapExpertise] ||
            Wrench;

          return (
            <Card key={index} className="border-2 border-border/50 bg-card/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <AboutHero content={aboutContent.hero} />
      <CompanyBadge content={aboutContent.companyInfo} />
      <StorySection content={aboutContent.story} />
      <ValuesSection content={aboutContent.values} />
      <ExpertiseSection content={aboutContent.expertise} />
      <TeamSection content={aboutContent.team} />
      <ContactSection content={aboutContent.contact} />
    </>
  );
}
