import {
  ServiceItem,
  PortfolioItem,
  PricingPackage,
  GiftingProduct,
  BlogPost,
  Testimonial,
} from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'logo-design',
    category: 'logo-design',
    title: 'Logo Design & Brand Identity',
    tagline: 'Distinctive, memorable logos that define market leaders.',
    description:
      'We craft iconic vector logos tailored to your brand personality. From minimal and modern marks to luxury crests, 3D emblems, and character mascots.',
    iconName: 'PenTool',
    turnaroundTime: '3-5 Business Days',
    popular: true,
    heroImage:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Minimalist & Flat Logomarks',
      'Luxury & Emblem Logos',
      '3D & Gradient Logos',
      'Character & Mascot Design',
      'Complete Color & Typography Palette',
      'Vector AI, EPS, SVG, PNG & Print PDF Files',
      '3D Realistic Mockups & Social Avatars',
      'Unlimited Revision Cycles (Configurable)',
    ],
    deliverables: [
      'Vector Source Files (AI, EPS, SVG)',
      'High-Res Transparent PNGs (Dark/Light)',
      'Brand Identity Guideline Sheet (PDF)',
      'Social Media Profile Avatar Pack',
      'Copyright Transfer Document',
    ],
  },
  {
    id: 'graphic-design',
    category: 'graphic-design',
    title: 'Graphic Design & Marketing Collateral',
    tagline: 'Eye-catching visuals that command attention and drive sales.',
    description:
      'High-impact visual creatives for digital advertising, print campaigns, social media, packaging, and event merchandise.',
    iconName: 'Palette',
    turnaroundTime: '2-4 Business Days',
    heroImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Social Media Ads & Carousel Graphics',
      'Business Cards & Stationery Sets',
      'Flyers, Posters & Tri-fold Brochures',
      'Product Packaging & Box Dielines',
      'Restaurant Menus & Signboards',
      'Large Format Event Banners & Roll-ups',
      'E-commerce Banner Sets & Ad Creatives',
      'Print-ready PDF with Bleed Marks',
    ],
    deliverables: [
      'Editable Source Files (PSD/AI/Figma)',
      'Print-Ready Press PDFs (CMYK, 300 DPI)',
      'Optimized Web Images (RGB, WebP/PNG)',
      'Multi-size Social Media Assets',
    ],
  },
  {
    id: 'web-mobile-apps',
    category: 'web-mobile-apps',
    title: 'Web Apps & Mobile Development',
    tagline: 'High-performance web platforms and native mobile applications.',
    description:
      'Custom web applications, SaaS platforms, e-commerce portals, and cross-platform Android & iOS mobile apps engineered for speed, security, and conversion.',
    iconName: 'Code',
    turnaroundTime: '2-4 Weeks',
    heroImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Custom React.js / Next.js / TypeScript Web Apps',
      'Android & iOS Apps (Flutter / React Native)',
      'E-Commerce Portals & Custom Checkout Systems',
      'SaaS Web Applications & Admin Dashboards',
      'ERP, CRM & Enterprise Software Solutions',
      'Progressive Web Apps (PWA) with Offline Support',
      'REST API & GraphQL Backend Systems',
      'Cloud Infrastructure & CI/CD Deployment',
    ],
    deliverables: [
      'Full Clean Source Code Repository (GitHub/GitLab)',
      'Interactive Figma UI/UX Prototype',
      'Deployed Production Web/App Instances',
      'API Documentation & Admin Manual',
      '60 Days Free Post-Launch Maintenance',
    ],
  },
  {
    id: 'custom-gifting',
    category: 'custom-gifting',
    title: 'Custom Gifting & Print-On-Demand',
    tagline: 'Premium branded merchandise and bespoke corporate gifts.',
    description:
      'Custom merchandise printing for corporate events, employee kits, promotional swag, wedding giveaways, and print-on-demand e-commerce dropshipping.',
    iconName: 'Gift',
    turnaroundTime: '3-7 Business Days',
    heroImage:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Custom Apparel (T-shirts, Hoodies, Jackets)',
      'Custom Drinkware (Mugs, Insulated Tumblers)',
      'Office Swag (Tote Bags, Notebooks, Mouse Pads)',
      'Phone Cases & Tech Accessories',
      'Luxury Corporate Welcome & Onboarding Kits',
      'Wedding & VIP Event Keepsakes',
      'Direct-to-Garment (DTG) & Screen Printing',
      'Laser Engraving & UV Embossing',
    ],
    deliverables: [
      'Digital 3D Proof Before Printing',
      'Bulk Packaging & Custom Unboxing Cards',
      'Doorstep Delivery with Tracking',
      'Quality Inspection Certification',
    ],
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Nexus Fintech App & Rebrand',
    category: 'web-mobile-apps',
    client: 'Nexus Global Pay',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Complete digital transformation, mobile app redesign, and institutional brand kit for a cross-border payments platform.',
    challenge:
      'Nexus was struggling with low conversion on their legacy portal and outdated visual identity that failed to inspire trust with high-value B2B partners.',
    solution:
      'ADR E-Store architected a React Native cross-platform mobile app paired with a dark-navy premium brand identity system.',
    results: [
      '184% increase in user signups within 60 days',
      '4.9/5 star average rating across App Store & Google Play',
      '$12M in new transaction volume processed',
    ],
    tags: ['Mobile App', 'React Native', 'Brand Identity', 'UI/UX'],
    testimonial: {
      quote:
        'ADR E-Store completely revitalized our product. Their design precision and engineering speed were unmatched.',
      author: 'Marcus Vance',
      role: 'CTO, Nexus Pay',
    },
  },
  {
    id: 'port-2',
    title: 'Aura Luxury Hotel Brand Book',
    category: 'graphic-design',
    client: 'Aura Hospitality Group',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Bespoke gold-embossed brand identity, stationery set, and guest welcome kits for a 5-star boutique resort chain.',
    challenge:
      'Needed a refined visual identity that resonated with international luxury travelers.',
    solution:
      'Crafted a minimalist logomark inspired by Mediterranean architecture, complemented by luxury linen packaging and custom engraved room keys.',
    results: [
      '35% increase in direct room bookings',
      'Featured in International Design Digest 2025',
      '100% staff adoption of brand standards',
    ],
    tags: ['Luxury Branding', 'Stationery', 'Print', 'Welcome Kits'],
  },
  {
    id: 'port-3',
    title: 'Pulse Wearables E-Commerce & Merch',
    category: 'custom-gifting',
    client: 'Pulse Activewear',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Custom high-performance gym merchandise and custom print-on-demand fulfillment for fitness influencer brand.',
    challenge:
      'High print defect rates and slow delivery times from previous merchandise vendor.',
    solution:
      'ADR E-Store supplied DTG-printed organic cotton hoodies, thermal water bottles, and custom unboxing packages.',
    results: [
      '5,000+ units sold out in first 48 hours',
      '0.2% return rate across all product lines',
      'Seamless bulk shipping to 18 countries',
    ],
    tags: ['Custom Apparel', 'Print-on-Demand', 'Merchandise'],
  },
  {
    id: 'port-4',
    title: 'Lumina Tech SaaS Dashboard',
    category: 'web-mobile-apps',
    client: 'Lumina Analytics',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Real-time data visualization dashboard and cloud application for enterprise AI workflow monitoring.',
    challenge:
      'Complex multi-tenant analytics engine needed an intuitive UI with zero latency.',
    solution:
      'Developed a React 19 application with Tailwind CSS and interactive D3 chart visualizers.',
    results: [
      '40% reduction in customer onboarding friction',
      'Handled over 100M daily event log entries',
      'Secured $4.5M Series A funding post-launch',
    ],
    tags: ['SaaS', 'Web App', 'React', 'Dashboard'],
  },
  {
    id: 'port-5',
    title: 'Verde Organics Packaging Suite',
    category: 'graphic-design',
    client: 'Verde Botanical Products',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Eco-friendly product packaging dielines, label design, and retail display banners for organic cosmetics.',
    challenge:
      'Stand out in crowded retail supermarket shelves while retaining eco-conscious aesthetics.',
    solution:
      'Created textured kraft paper packaging with vibrant plant-based spot UV botanical illustrations.',
    results: [
      'Placed in 450+ retail supermarket doors',
      'Won Green Design Award 2025',
    ],
    tags: ['Packaging Design', 'Graphic Design', 'Retail'],
  },
  {
    id: 'port-6',
    title: 'Vanguard Cyber Mascot & Logo',
    category: 'logo-design',
    client: 'Vanguard Security Systems',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Futuristic 3D shield logomark and metallic cybersecurity mascot character for global enterprise protection firm.',
    challenge:
      'Needed a bold visual mark that signified unbreakable digital defense.',
    solution:
      '3D metallic cyber-lion emblem and vector logo suite with dark mode neon accents.',
    results: ['Adopted across 12 international branch offices'],
    tags: ['3D Logo', 'Mascot Design', 'Logo Design'],
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  // Logo Design
  {
    id: 'logo-starter',
    serviceCategory: 'logo-design',
    name: 'Starter Logo',
    description: 'Perfect for startups and solopreneurs needing a clean mark.',
    features: [
      '3 Unique Initial Concepts',
      'Vector AI, EPS, SVG & PNG Files',
      'High Resolution Print PDF',
      'Basic Color Palette & Font Pairs',
      '3 Revision Rounds',
      'Full Commercial Copyrights',
    ],
    deliveryTime: '3 Business Days',
    revisions: '3 Rounds',
  },
  {
    id: 'logo-business',
    serviceCategory: 'logo-design',
    name: 'Business Pro Logo',
    popular: true,
    description:
      'Ideal for growing businesses requiring a comprehensive logo system.',
    features: [
      '6 Unique Custom Concepts',
      'Minimal, 3D & Vintage Variations',
      'Complete Source File Suite',
      'Social Media Profile Avatar Pack',
      'Stationery Mockups (Card & Letterhead)',
      'Unlimited Revisions',
      'Priority Design Support',
    ],
    deliveryTime: '4 Business Days',
    revisions: 'Unlimited',
  },
  {
    id: 'logo-enterprise',
    serviceCategory: 'logo-design',
    name: 'Luxury & Mascot Suite',
    description:
      'High-end 3D emblems, mascot designs, and full visual brand identity.',
    features: [
      'Custom 3D Emblems or Mascot Design',
      'Complete Brand Guideline Booklet (20 Pages)',
      'Sub-logo & Favicon Variants',
      'Typography & Color System Manual',
      'Stationery + Social Media Kit',
      'Unlimited Revisions',
      'Dedicated Creative Director',
    ],
    deliveryTime: '5-7 Business Days',
    revisions: 'Unlimited',
  },

  // Graphic Design
  {
    id: 'graphic-starter',
    serviceCategory: 'graphic-design',
    name: 'Single Asset Design',
    description:
      'One focused marketing graphic, poster, banner, or brochure.',
    features: [
      '1 High-Impact Marketing Asset',
      'Multiple Size Output Specs',
      'Source File (PSD/AI/Figma)',
      'Print Ready CMYK + Web RGB',
      '2 Revision Rounds',
    ],
    deliveryTime: '2 Business Days',
    revisions: '2 Rounds',
  },
  {
    id: 'graphic-pro',
    serviceCategory: 'graphic-design',
    name: 'Monthly Design Retainer',
    popular: true,
    description:
      'Dedicated graphic design team for ongoing social media & ad creatives.',
    features: [
      'Up to 15 Graphic Assets per month',
      'Social Media Posts, Flyers & Banners',
      'Ad Creatives & Email Headers',
      'Dedicated Designer Allocation',
      '48-Hour Turnaround per Asset',
      'Unlimited Revisions',
    ],
    deliveryTime: '48h per task',
    revisions: 'Unlimited',
  },

  // Web & Mobile Apps
  {
    id: 'web-landing',
    serviceCategory: 'web-mobile-apps',
    name: 'Business Website',
    description:
      'High-converting, responsive website for service businesses & agencies.',
    features: [
      'Up to 5 Custom React/Vite Pages',
      'Mobile First Responsive Layout',
      'SEO Optimized & Fast Speed',
      'Contact Form & Lead Capture',
      'Google Maps & Analytics Integrated',
      'Hosting & Domain Setup Included',
      '30 Days Free Maintenance',
    ],
    deliveryTime: '7-10 Business Days',
    revisions: '3 Rounds',
  },
  {
    id: 'web-app-pro',
    serviceCategory: 'web-mobile-apps',
    name: 'Custom Web & Mobile App',
    popular: true,
    description:
      'Full-stack SaaS, e-commerce portal, or Flutter mobile app development.',
    features: [
      'Full React/Next.js Web + Mobile App',
      'Backend REST API & Database Setup',
      'User Authentication & Payment Gateway',
      'Admin Control Panel Dashboard',
      'Custom API & Cloud Deployment',
      'Interactive Figma UI/UX Mockup',
      '60 Days Free Maintenance',
    ],
    deliveryTime: '3-4 Weeks',
    revisions: 'Unlimited during dev',
  },
];

export const GIFTING_PRODUCTS: GiftingProduct[] = [
  {
    id: 'g-tshirt',
    name: 'Premium Organic Cotton T-Shirt',
    category: 'wearable',
    minQuantity: 10,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#FFFFFF', '#0a1128', '#64748b', '#dc2626'],
    description:
      '220 GSM 100% combed organic cotton t-shirt with DTG or screen-printed brand artwork.',
    printMethods: ['Direct to Garment (DTG)', 'Screen Printing', 'Embroidery'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  },
  {
    id: 'g-hoodie',
    name: 'Heavyweight Fleece Hoodie',
    category: 'wearable',
    minQuantity: 10,
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#1e293b', '#475569', '#1e3a8a'],
    description:
      'Ultra-soft 350 GSM fleece hoodie with custom chest print and sleeve embroidery.',
    printMethods: ['Embroidery', 'DTG Printing', 'Puff Print'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'g-mug',
    name: 'Matte Ceramic Coffee Mug (15oz)',
    category: 'drinkware',
    minQuantity: 20,
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    colors: ['#0a1128', '#FFFFFF', '#18181b', '#047857'],
    description:
      'Double-walled matte finish ceramic coffee mug with wrap-around brand logo.',
    printMethods: ['Sublimation Print', 'Laser Engraving', 'UV Emboss'],
  },
  {
    id: 'g-tumbler',
    name: 'Insulated Stainless Steel Tumbler',
    category: 'drinkware',
    minQuantity: 15,
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    colors: ['#0a1128', '#000000', '#2563eb', '#059669'],
    description:
      '24hr cold / 12hr hot thermal insulation tumbler with laser-etched corporate brand.',
    printMethods: ['Laser Engraving', 'UV Printing'],
  },
  {
    id: 'g-totebag',
    name: 'Eco Heavy Canvas Tote Bag',
    category: 'accessories',
    minQuantity: 25,
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    colors: ['#fef3c7', '#000000', '#1e293b'],
    description:
      'Durable 14oz natural canvas tote with reinforced handles for trade shows and giveaways.',
    printMethods: ['Screen Printing', 'Heat Transfer'],
  },
  {
    id: 'g-welcomekit',
    name: 'VIP Corporate Welcome Swag Box',
    category: 'kits',
    minQuantity: 5,
    image:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    colors: ['#0a1128', '#000000'],
    description:
      'Luxury gift box containing customized t-shirt, thermal bottle, leather journal, metal pen, and welcome card.',
    printMethods: ['Complete Custom Kit Branding', 'Laser Engraving', 'Gold Foil Box'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    slug: 'brand-identity-trends-2026',
    title: 'Top Brand Identity Trends Shaping 2026: From Kinetic Logos to 3D Micro-interactions',
    excerpt:
      'Discover how leading global brands are adopting dynamic logo systems, warm monochrome palettes, and interactive design languages.',
    category: 'Corporate Branding',
    author: {
      name: 'Adrian Reyes',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Creative Director',
    },
    publishedAt: 'July 24, 2026',
    readTime: '6 min read',
    coverImage:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
    tags: ['Branding', 'Design Trends', 'Logo Design'],
    content: `
# Brand Identity Trends Shaping 2026

Building an authentic brand identity requires looking beyond momentary fads to establish enduring emotional resonance. In 2026, corporate branding is undergoing a fundamental shift toward dynamic adaptability and tactile digital experiences.

## 1. Kinetic & Fluid Logomarks
Static logos are no longer sufficient for digital-first audiences. Brands are adopting **kinetic logos** that morph across mobile app screens, smartwatch displays, and interactive billboard displays.

## 2. Dimensional Micro-Interactions
Flat design has evolved. Today's high-conversion interfaces combine sleek minimalism with subtle 3D lighting, glassmorphism accents, and tactile physical feedback.

## 3. High-Touch Corporate Merchandise
Swag is no longer an afterthought. Modern employees and clients expect sustainable, premium retail-quality merchandise that reflects genuine brand prestige.

*Looking to upgrade your brand identity? [Get a free consultation with ADR E-Store today](#quote).*
    `,
  },
  {
    id: 'b-2',
    slug: 'flutter-vs-react-native-2026',
    title: 'Flutter vs React Native in 2026: Choosing the Best Stack for Your Mobile App',
    excerpt:
      'An engineering breakdown of performance, developer experience, cross-platform capabilities, and cost for enterprise mobile apps.',
    category: 'Development',
    author: {
      name: 'David Chen',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Head of Engineering',
    },
    publishedAt: 'July 18, 2026',
    readTime: '8 min read',
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Flutter', 'Mobile Apps', 'Web Development'],
    content: `
# Flutter vs React Native in 2026

When launching a new cross-platform mobile application, choosing between Flutter and React Native can dictate your time-to-market and long-term maintenance costs.

## Performance Benchmark
Both frameworks now offer native compilation pipelines. Flutter shines in graphics-heavy UIs with 120 FPS rendering, while React Native seamlessly integrates with existing web codebases via shared TypeScript modules.

## Key Recommendations
- **Choose React Native** if your team heavily utilizes React for web and desires Maximum code reuse across Web & Mobile.
- **Choose Flutter** if your app demands custom pixel-perfect canvas rendering, complex animations, or embedded IoT controllers.
    `,
  },
  {
    id: 'b-3',
    slug: 'corporate-gifting-roi-guide',
    title: 'How High-Quality Corporate Gifting Boosts Client Retention by 42%',
    excerpt:
      'Why generic promotional items fail, and how customized VIP onboarding kits drive long-term business partnerships.',
    category: 'Custom Gifting',
    author: {
      name: 'Sophia Patel',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Merchandise Strategist',
    },
    publishedAt: 'July 10, 2026',
    readTime: '5 min read',
    coverImage:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80',
    tags: ['Corporate Gifting', 'Merchandise', 'Client Retention'],
    content: `
# Corporate Gifting ROI: A Strategic Guide

Corporate gifts are not expenses; they are high-return relational assets. Sending a thoughtful, premium welcome kit creates a lasting physical touchpoint that digital ads simply cannot replicate.
    `,
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Alexander Ross',
    role: 'Managing Director',
    company: 'Apex Global Capital',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceCategory: 'logo-design',
    verified: true,
    content:
      'ADR E-Store transformed our entire brand ecosystem. Their team delivered sophisticated stationery, pitch decks, and brand guidelines that immediately elevated our presence with institutional investors.',
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Product Lead',
    company: 'Nova Cloud Systems',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceCategory: 'web-mobile-apps',
    verified: true,
    content:
      'The custom web app built by ADR E-Store outperformed all our performance benchmarks. Their attention to UI detail and backend clean code is world-class.',
  },
  {
    id: 't-3',
    name: 'Rajiv Sharma',
    role: 'Founder',
    company: 'Urban Roasters Coffee',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceCategory: 'logo-design',
    verified: true,
    content:
      'We received over 6 logo concepts within 48 hours and the final 3D packaging design was stunning. Sales jumped 40% in our first month after launch.',
  },
  {
    id: 't-4',
    name: 'Sarah Jenkins',
    role: 'VP People & Culture',
    company: 'Starlight Tech',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    serviceCategory: 'custom-gifting',
    verified: true,
    content:
      'Ordered 500 custom welcome swag boxes for our remote employees globally. The print quality on the hoodies and laser engraving on tumblers was flawless!',
  },
];

export const FAQS = [
  {
    question: 'What is the typical turnaround time for a project?',
    answer:
      'Turnaround times depend on the scope: Logo design and graphic creatives take 2-4 business days. Custom gifting and print orders take 3-7 days. Web & mobile application development typically takes 2-4 weeks.',
  },
  {
    question: 'How do revisions work for design services?',
    answer:
      'We offer configurable revision cycles. Our Business and Enterprise packages feature unlimited revisions until you are 100% satisfied with your final assets.',
  },
  {
    question: 'Can I order custom gifts and merchandise in bulk?',
    answer:
      'Yes! We specialize in bulk corporate orders, employee welcome swag kits, event merchandise, and custom print-on-demand fulfillment. Our interactive product customizer provides instant tiered price discounts.',
  },
  {
    question: 'Will I own the full copyrights to the final designs and code?',
    answer:
      'Absolutely. Upon final payment, you receive 100% full intellectual property and commercial copyright ownership for all vector files, brand guidelines, and source code.',
  },
  {
    question: 'Do you offer ongoing maintenance for web and mobile apps?',
    answer:
      'Yes! All web and mobile app projects include 30 to 60 days of complimentary post-launch support and maintenance. Extended SLA support plans are also available.',
  },
];

export const TECH_STACK = [
  { name: 'React.js', category: 'Frontend', icon: 'Atom' },
  { name: 'TypeScript', category: 'Language', icon: 'Code2' },
  { name: 'Tailwind CSS', category: 'Styling', icon: 'Sparkles' },
  { name: 'Node.js & Express', category: 'Backend', icon: 'Server' },
  { name: 'Flutter & React Native', category: 'Mobile', icon: 'Smartphone' },
  { name: 'PostgreSQL / MongoDB', category: 'Database', icon: 'Database' },
  { name: 'Google Cloud & Vercel', category: 'Cloud Deployment', icon: 'Cloud' },
  { name: 'Gemini AI Integration', category: 'AI Services', icon: 'Bot' },
];
