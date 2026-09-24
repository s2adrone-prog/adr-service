export type PageRoute =
  | 'home'
  | 'service-logo-design'
  | 'service-graphic-design'
  | 'service-web-mobile-apps'
  | 'service-custom-gifting'
  | 'portfolio'
  | 'about'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin';

export type ServiceCategory =
  | 'logo-design'
  | 'graphic-design'
  | 'web-mobile-apps'
  | 'custom-gifting';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  popular?: boolean;
  startingPrice?: string;
  turnaroundTime: string;
  heroImage: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  client: string;
  year: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface PricingPackage {
  id: string;
  serviceCategory: ServiceCategory;
  name: string;
  price?: string;
  billingCycle?: string;
  popular?: boolean;
  description: string;
  features: string[];
  nonFeatures?: string[];
  deliveryTime: string;
  revisions: string;
}

export interface GiftingProduct {
  id: string;
  name: string;
  category: 'wearable' | 'drinkware' | 'accessories' | 'stationery' | 'kits';
  basePrice?: number;
  minQuantity: number;
  image: string;
  colors: string[];
  description: string;
  printMethods: string[];
  sizes?: string[];
}

export interface CustomGiftingOrder {
  id?: string;
  productId: string;
  productName: string;
  color: string;
  size?: string;
  quantity: number;
  printLocation: string;
  customText?: string;
  artworkName?: string;
  artworkDataUrl?: string;
  unitPrice?: number;
  totalEstimate?: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName?: string;
  notes?: string;
  createdAt?: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceCategory: ServiceCategory | string;
  packageTier?: string;
  projectDescription: string;
  budgetRange?: string;
  timeline: string;
  attachmentName?: string;
  status: 'New' | 'Contacted' | 'In Review' | 'Quoted' | 'Closed';
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied' | 'Resolved';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  serviceCategory: ServiceCategory;
  verified: boolean;
}

export interface BrandStylesConfig {
  primaryColor: string;
  secondaryColor: string;
  accentGradient: string;
  darkBgColor: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'display';
  borderRadius: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  headerStyle: 'glass' | 'solid' | 'transparent';
  enableAmbientGlow: boolean;
}

export interface BrandInfoConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  showLogoIcon: boolean;
  logoIconText: string;
  phone: string;
  phoneHours: string;
  email: string;
  address: string;
  whatsappNumber: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    behance?: string;
  };
}

export interface HeroContentConfig {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  paragraph: string;
  ctaButtonText: string;
  ctaButtonTarget: 'contact' | 'portfolio' | 'services';
  showTrustMetrics: boolean;
  heroImage: string;
}

export interface TrustGuaranteesConfig {
  guarantee1: string;
  guarantee2: string;
  guarantee3: string;
}

export interface BottomCtaConfig {
  title: string;
  description: string;
  buttonText: string;
}

export interface SiteConfig {
  brand: BrandInfoConfig;
  styles: BrandStylesConfig;
  hero: HeroContentConfig;
  guarantees: TrustGuaranteesConfig;
  bottomCta: BottomCtaConfig;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  pricingPackages: PricingPackage[];
  giftingProducts: GiftingProduct[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqs: { question: string; answer: string }[];
  updatedAt?: string;
}
