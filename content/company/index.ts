import { TeamMember } from "@/types/employee";
import { SocialLink } from "@/types/social-link";

export const MAIN_DOMAIN = "https://www.solskjerming-as.no";
export const URL_EXTENSION_STORE_BASE = "/nettbutikk";
export const URL_EXTENSION_AWNING_TERRACE_AWNINGS =
  "/utvendig-solskjerming/markiser/terrassemarkiser";
export const HREF_AWNING_STORE = `${MAIN_DOMAIN}${URL_EXTENSION_STORE_BASE}${URL_EXTENSION_AWNING_TERRACE_AWNINGS}`;

export const COMPANY_INFO = {
  name: "Solskjerming AS",
  address: "Måkeveien 6",
  city: "Fredrikstad",
  zip: "1679 Kråkerøy",
  phone: "+47 6910 9888",
  email: "post@solskjerming-as.no",
  orgNumber: "NO 911 884 348 MVA",
  days: "Mandag - Fredag",
  hours: "09:00 - 16:00",
} as const;

export const TEAM: TeamMember[] = [
  {
    name: "Håkon Renskoug",
    role: "Eier og produktansvarlig",
    bio: "Maskiningeniør",
    image: "/team/haakon-renskoug.jpg",
  },
  {
    name: "Morten Øhrn",
    role: "Daglig leder",
    image: "/team/morten-ohrn.jpg",
  },
  {
    name: "Håkon Renskoug",
    role: "Eier og produktansvarlig",
    bio: "Bygningsingeniør",
    image: "/team/staale-krabset.jpg",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Solskjerming.AS",
    icon: "Facebook",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@SolskjermingAS",
    icon: "YouTube",
  },
];
