export interface NavigationItem {
  title: string;
  href: string;
  ariaLabel?: string;
}

interface FooterBrand {
  logo: string;
  href: string;
  ariaLabel: string;
}

export interface FooterProps {
  brandSection: {
    title: string;
    description: string;
    brand?: FooterBrand;
    tagLine?: string;
  };
  navigation: {
    products: NavigationItem[];
    resources: NavigationItem[];
    contact: NavigationItem[];
  };
  legal: NavigationItem[];
}
