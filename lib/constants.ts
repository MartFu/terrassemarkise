export const SITE_URLS = {
  ABOUT: "/om-oss/",
  CONTACT: "/kontaktoss/",
  LEGAL: "/juridisk/",
  PRODUCTS: "/produkter/",
  AWNING_OPTIONS: "/produkter/terrassemarkiser/duk-og-farger",
  ACCESSORIES: "/produkter/terrassemarkiser/tilbehor/",
  MOTORS: "/produkter/terrassemarkiser/tilbehor/motorisering",
  WIND_SENSORS: "/produkter/terrassemarkiser/tilbehor/vindsensorer",
  AWNINGS: "/produkter/terrassemarkiser/",
  RESOURCES: "/ressurser/",
  VIDEOS: "/ressurser/videoer/",
  ARTICLES: "/ressurser/artikler/",
  CASE_STUDIES: "/ressurser/prosjekter/",
  TOOLS: "/ressurser/verktoy/",
} as const;

export const EXTERNAL_URLS = {
  MAIN_DOMAIN_BASE: "https://solskjerming-as.no",
  MAIN_DOMAIN_STORE_OUTDOOR_SUN_SCREENING:
    "https://www.solskjerming-as.no/nettbutikk/utvendig-solskjerming",
  MAIN_DOMAIN_STORE_AWNINGS:
    "https://www.solskjerming-as.no/nettbutikk/utvendig-solskjerming/markiser",
  /** NOTE: Has to include the product after .../terrassemarkiser/{productSlug} as it
   *  the url by itself is a miss.
   */
  MAIN_DOMAIN_STORE_AWNINGS_TERRACE_AWNINGS:
    "https://www.solskjerming-as.no/nettbutikk/utvendig-solskjerming/markiser/terrassemarkiser",

  GOOGLE_MAPS_URL:
    "https://www.google.com/maps/place/Solskjerming+AS/@59.1923084,10.8940538,776m/data=!3m1!1e3!4m8!3m7!1s0x46441d30e3966679:0xf37539405794f955!8m2!3d59.1923084!4d10.8966341!9m1!1b1!16s%2Fg%2F12mkvpyvk?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  GOOGLE_MAPS_EMBED_URL:
    "https://www.google.com/maps?q=Solskjerming+AS+Måkeveien+6+Kråkerøy&output=embed",
} as const;
