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
  orgNumber: "911 884 348",
  days: "Mandag - Fredag",
  hours: "09:00 - 16:00",
  foundingYear: 2013,
} as const;

export const TEAM: TeamMember[] = [
  {
    name: "Håkon Renskoug",
    role: "Eier og produktansvarlig",
    description: "Maskiningeniør",
    image: "/assets/team/h-renskoug.jpg",
    imageAlt: "Portrett av Håkon Renskoug",
    isOwner: true,
    social: {
      facebook: "www.facebook.com/StåleKrabset",
      linkedin: "www.linkedin.com/in/st%C3%A5le-krabset",
    },
  },
  {
    name: "Morten Øhrn",
    role: "Daglig leder",
    image: "/assets/team/m-ohrn.jpg",
    imageAlt: "Portrett av Morten Øhrn",
    social: {
      facebook: "www.facebook.com/StåleKrabset",
      linkedin: "www.linkedin.com/in/st%C3%A5le-krabset",
    },
  },
  {
    name: "Ståle Krabset",
    role: "Økonomiansvarlig",
    description: "Bygningsingeniør",
    imageAlt: "Portrett av Ståle Krabset",
    image: "/assets/team/s-krabset.jpg",
    social: {
      facebook: "www.facebook.com/StåleKrabset",
      linkedin: "www.linkedin.com/in/st%C3%A5le-krabset",
    },
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

// UTILITIES
export const getTeamMemberByName = (name: string): TeamMember | undefined => {
  return TEAM.find((member) => member.name === name);
};

/**
 *
 * @returns company owner
 * @throws if owner does not exist in variable TEAM
 */
export const getCompanyOwner = () => {
  const owner = getTeamMemberByName("Håkon Renskoug");
  if (!owner) {
    throw new Error(
      "[getCompanyOwner]: Owner not found in TEAM. Update TEAM variable to include owner or rewrite function getCompanyOwner",
    );
  }
  return owner;
};
