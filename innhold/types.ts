/**
 * Content Types
 * TypeScript definitions for all content structures used across the site
 */

// Navigation
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

// Hero Section
export interface HeroContent {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  image?: ImageContent;
  badges?: string[];
}

export interface CtaButton {
  label: string;
  href: string;
  external?: boolean;
}

export interface ImageContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Trust Indicators
export interface TrustIndicator {
  icon: string; // Lucide icon name
  value: string;
  label: string;
}

export interface TrustLogos {
  title?: string;
  logos: ImageContent[];
}

// Features
export interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export interface FeatureSection {
  eyebrow?: string;
  title: string;
  description?: string;
  features: Feature[];
}

// Testimonials
export interface Testimonial {
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: ImageContent;
  };
  rating?: number;
}

export interface TestimonialSection {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
}

// Products
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price?: {
    amount: number;
    currency: string;
    unit?: string;
  };
  image: ImageContent;
  features?: string[];
  category?: string;
  tags?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ProductSection {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

// Team
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image: ImageContent;
  social?: {
    linkedin?: string;
    email?: string;
    phone?: string;
  };
}

export interface TeamSection {
  title: string;
  description?: string;
  members: TeamMember[];
}

// About / Company
export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface CompanyInfo {
  name: string;
  tagline?: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: CompanyValue[];
  founded?: string;
  location?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

// Contact
export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  openingHours?: string;
  mapUrl?: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

// Articles / Blog / Veiledning
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author?: {
    name: string;
    avatar?: ImageContent;
  };
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  image?: ImageContent;
  readingTime?: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

// Tools (for Veiledning)
export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  category?: string;
}

// Legal Documents
export interface LegalDocument {
  id: string;
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  category?: string;
}

// CTA Banner
export interface CtaBanner {
  title: string;
  description?: string;
  cta: CtaButton;
  secondaryCta?: CtaButton;
  variant?: "default" | "accent" | "primary";
}

// FAQ
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title?: string;
  description?: string;
  items: FaqItem[];
}

// Stats
export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSection {
  title?: string;
  stats: Stat[];
}

// Page Meta
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Full Page Content Structures
export interface IndexPageContent {
  meta: PageMeta;
  hero: HeroContent;
  trustIndicators?: TrustIndicator[];
  features?: FeatureSection;
  products?: ProductSection;
  testimonials?: TestimonialSection;
  stats?: StatsSection;
  ctaBanner?: CtaBanner;
}

export interface AboutPageContent {
  meta: PageMeta;
  hero: HeroContent;
  company: CompanyInfo;
  timeline?: TimelineEvent[];
  team?: TeamSection;
  ctaBanner?: CtaBanner;
}

export interface ContactPageContent {
  meta: PageMeta;
  hero: HeroContent;
  contactInfo: ContactInfo;
  formFields: ContactFormField[];
  faq?: FaqSection;
}

export interface ProductsPageContent {
  meta: PageMeta;
  hero: HeroContent;
  categories?: ArticleCategory[];
  products: Product[];
  ctaBanner?: CtaBanner;
}

export interface VeiledningPageContent {
  meta: PageMeta;
  hero: HeroContent;
  tools?: Tool[];
  categories?: ArticleCategory[];
  articles: Article[];
}

export interface JuridiskPageContent {
  meta: PageMeta;
  hero: HeroContent;
  documents: LegalDocument[];
}
