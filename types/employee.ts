export interface TeamMember {
  name: string;
  role: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  avatar?: string;
  mail?: string;
  phone?: string;
  isOwner?: boolean;
  social?: Record<string, string>;
}
