import { SiteConfig } from '../types';
import {
  SERVICES_DATA,
  PORTFOLIO_DATA,
  PRICING_PACKAGES,
  GIFTING_PRODUCTS,
  BLOG_POSTS,
  TESTIMONIALS_DATA,
  FAQS,
} from './mockData';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand: {
    name: 'ADR E-Store',
    shortName: 'ADR',
    tagline: 'Creative Digital Agency',
    description:
      'Transforming creative ideas into high-converting brands, modern web & mobile applications, and custom print-on-demand corporate gifting solutions globally.',
    showLogoIcon: false,
    logoIconText: 'ADR',
    phone: '+91 7003477334',
    phoneHours: 'Mon - Fri: 10am - 8pm IST',
    email: 'info@adrestore.co.in',
    address: 'ADR E-Store, Hridaypur, Netaji Subhas Road, Kolkata - 700127',
    whatsappNumber: '+91 7003477334',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      github: 'https://github.com',
      behance: 'https://behance.net',
    },
  },
  styles: {
    primaryColor: '#06b6d4', // Cyan 500
    secondaryColor: '#3b82f6', // Blue 500
    accentGradient: 'from-cyan-400 via-sky-400 to-blue-600',
    darkBgColor: '#0a1128', // Deep Midnight
    fontFamily: 'sans',
    borderRadius: 'rounded-2xl',
    headerStyle: 'glass',
    enableAmbientGlow: true,
  },
  hero: {
    badgeText: 'ADR E-Store Digital Agency & Custom Gifting',
    titlePrefix: 'Transforming Ideas into',
    titleHighlight: 'Powerful Brands',
    titleSuffix: '& Digital Experiences',
    paragraph:
      'ADR E-Store is a full-service creative agency offering custom logo design, graphic collateral, corporate branding identity, high-performance web/mobile applications, and bespoke print-on-demand gifting solutions.',
    ctaButtonText: 'Book a Consultation',
    ctaButtonTarget: 'contact',
    showTrustMetrics: true,
    heroImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  guarantees: {
    guarantee1: '100% Commercial Copyright Ownership Transfer',
    guarantee2: '5 times Revision on Pro & Business Tiers',
    guarantee3: 'Global Express Merchandise & Swag Shipping',
  },
  bottomCta: {
    title: 'Ready to Launch Your Brand & Digital Experience?',
    description:
      'Get in touch today for a free custom quote, brand audit, or software estimate from our creative team.',
    buttonText: 'Contact Our Agency',
  },
  services: SERVICES_DATA,
  portfolio: PORTFOLIO_DATA,
  pricingPackages: PRICING_PACKAGES,
  giftingProducts: GIFTING_PRODUCTS,
  blogPosts: BLOG_POSTS,
  testimonials: TESTIMONIALS_DATA,
  faqs: FAQS,
  updatedAt: new Date().toISOString(),
};
