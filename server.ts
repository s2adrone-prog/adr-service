import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { BLOG_POSTS, PORTFOLIO_DATA } from './src/data/mockData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory data persistence
let quoteRequests: any[] = [
  {
    id: 'Q-1001',
    name: 'Sarah Jenkins',
    email: 'sarah@starlighttech.com',
    phone: '+1 (555) 234-5678',
    company: 'Starlight Tech',
    serviceCategory: 'custom-gifting',
    packageTier: 'VIP Welcome Kits',
    projectDescription: '500 customized welcome kits for remote tech staff with hoodies, tumblers, and leather notebooks.',
    budgetRange: '₹50,000 - ₹1,000,000',
    timeline: '2 Weeks',
    status: 'In Review',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'Q-1002',
    name: 'Marcus Vance',
    email: 'marcus@nexuspay.io',
    phone: '+1 (555) 876-5432',
    company: 'Nexus Pay',
    serviceCategory: 'web-mobile-apps',
    packageTier: 'Custom Web & Mobile App',
    projectDescription: 'Cross-platform fintech mobile app and web dashboard for cross-border transactions.',
    budgetRange: '₹1,00,000 - ₹2,50,000',
    timeline: '1 Month',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

let contactEnquiries: any[] = [
  {
    id: 'E-501',
    name: 'David Miller',
    email: 'david@millermedia.com',
    phone: '+1 (555) 345-6789',
    subject: 'Bulk Logo Design Enquiry for Franchise',
    message: 'We are expanding 12 franchise locations and need a master brand identity refresh.',
    status: 'New',
    createdAt: new Date().toISOString(),
  },
];

let giftingOrders: any[] = [];
let newsletterSubscribers: string[] = ['client@adrstore.com', 'partner@brand.org'];
let blogPostsStore = [...BLOG_POSTS];

// ---------------- API ROUTES ----------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'ADR E-Store Backend' });
});

// Quotes API
app.get('/api/quotes', (req, res) => {
  res.json({ success: true, quotes: quoteRequests });
});

app.post('/api/quotes', (req, res) => {
  const { name, email, phone, company, serviceCategory, packageTier, projectDescription, budgetRange, timeline, attachmentName } = req.body;
  
  if (!name || !email || !serviceCategory) {
    return res.status(400).json({ success: false, error: 'Name, email, and service selection are required.' });
  }

  const newQuote = {
    id: `Q-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    email,
    phone: phone || 'N/A',
    company: company || 'N/A',
    serviceCategory,
    packageTier: packageTier || 'Custom Quote',
    projectDescription: projectDescription || 'No description provided.',
    budgetRange: budgetRange || 'Flexible',
    timeline: timeline || 'Standard',
    attachmentName: attachmentName || null,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  quoteRequests.unshift(newQuote);
  res.json({ success: true, quote: newQuote, message: 'Quote request submitted successfully!' });
});

app.patch('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const quote = quoteRequests.find((q) => q.id === id);
  if (quote) {
    quote.status = status;
    return res.json({ success: true, quote });
  }
  res.status(404).json({ success: false, error: 'Quote not found' });
});

// Contact Enquiries API
app.get('/api/enquiries', (req, res) => {
  res.json({ success: true, enquiries: contactEnquiries });
});

app.post('/api/enquiries', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  const newEnquiry = {
    id: `E-${Math.floor(500 + Math.random() * 500)}`,
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Enquiry',
    message,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  contactEnquiries.unshift(newEnquiry);
  res.json({ success: true, enquiry: newEnquiry, message: 'Enquiry sent successfully!' });
});

// Custom Gifting Orders API
app.get('/api/gifting-orders', (req, res) => {
  res.json({ success: true, orders: giftingOrders });
});

app.post('/api/gifting-orders', (req, res) => {
  const order = req.body;
  if (!order.contactName || !order.contactEmail || !order.productName) {
    return res.status(400).json({ success: false, error: 'Contact details and product are required.' });
  }

  const newOrder = {
    ...order,
    id: `GIFT-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };

  giftingOrders.unshift(newOrder);
  res.json({ success: true, order: newOrder, message: 'Gifting quote request submitted!' });
});

// Newsletter API
app.get('/api/newsletter', (req, res) => {
  res.json({ success: true, subscribers: newsletterSubscribers });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Valid email address required.' });
  }
  if (!newsletterSubscribers.includes(email)) {
    newsletterSubscribers.push(email);
  }
  res.json({ success: true, message: 'Thank you for subscribing to ADR E-Store updates!' });
});

// Blog CMS API
app.get('/api/blogs', (req, res) => {
  res.json({ success: true, blogs: blogPostsStore });
});

app.post('/api/blogs', (req, res) => {
  const { title, excerpt, content, category, tags, coverImage } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, error: 'Title and content are required.' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newPost = {
    id: `b-${Date.now()}`,
    slug,
    title,
    excerpt: excerpt || title,
    content,
    category: category || 'General',
    author: {
      name: 'ADR Editorial Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Creative Lead',
    },
    publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '4 min read',
    coverImage: coverImage || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
    tags: tags || ['Branding', 'Agency'],
  };

  blogPostsStore.unshift(newPost);
  res.json({ success: true, blog: newPost });
});

// Gemini AI Project Estimator & Design Assistant
app.post('/api/ai-estimator', async (req, res) => {
  const { serviceType, projectDetails, budget, targetAudience } = req.body;

  if (!projectDetails) {
    return res.status(400).json({ success: false, error: 'Project details required for AI estimation.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead Project Estimator and Solutions Architect at "ADR E-Store", a top-tier digital agency specializing in Logo Design, Graphic Design, Corporate Branding, Web/Mobile Apps, and Custom Gifting/Merchandise.
      
A prospective client provided the following requirements:
- Service Type: ${serviceType || 'General Digital Agency Services'}
- Project Details: "${projectDetails}"
- Estimated Client Budget: ${budget || 'Flexible'}
- Target Audience / Goals: ${targetAudience || 'Not specified'}

Generate a professional, structured JSON response with the following exact keys:
{
  "projectScope": "Clear 2-sentence breakdown of what ADR E-Store will deliver",
  "recommendedStackOrMaterials": "List of key technologies, design assets, or materials recommended",
  "estimatedTimeline": "e.g., 5-7 Business Days or 3-4 Weeks",
  "estimatedPriceRange": "e.g., ₹25,000 - ₹50,000",
  "keyMilestones": ["Phase 1: Discovery & Wireframing", "Phase 2: Visual Design", "Phase 3: Delivery"],
  "proTips": "1 sentence advice for the client to maximize ROI"
}
Output ONLY valid JSON without markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        const parsedData = JSON.parse(cleanedJson);
        return res.json({ success: true, estimate: parsedData });
      } catch (parseErr) {
        return res.json({
          success: true,
          estimate: {
            projectScope: `Custom ${serviceType || 'Digital Agency'} project tailored to your specifications: ${projectDetails.substring(0, 100)}...`,
            recommendedStackOrMaterials: 'Figma Vector Graphics, React/TypeScript Architecture, HD Print Master Dielines',
            estimatedTimeline: '4-7 Business Days',
            estimatedPriceRange: budget || '₹25,000 - ₹50,000',
            keyMilestones: ['Discovery & Concepting', 'Design Execution & Revisions', 'Final Source Handover'],
            proTips: 'Providing brand guideline references early accelerates turnaround by 30%.',
          },
        });
      }
    } catch (err: any) {
      console.error('Gemini API Error:', err?.message || err);
    }
  }

  // Smart fallback estimate if API key unavailable or failed
  return res.json({
    success: true,
    estimate: {
      projectScope: `Tailored ${serviceType || 'Digital'} solution for ${projectDetails.substring(0, 90)}... Delivered with source vector files and full copyrights.`,
      recommendedStackOrMaterials: 'Adobe Creative Suite, Figma UI/UX, Production Print Bleed Spec',
      estimatedTimeline: '3-6 Business Days',
      estimatedPriceRange: budget && budget !== 'Flexible' ? budget : '₹14,999 - ₹49,999',
      keyMilestones: [
        'Initial Creative Strategy & Moodboard',
        'Asset Creation & Client Revisions',
        'Final Package Handover & IP Transfer',
      ],
      proTips: 'ADR E-Store provides unlimited revisions on all business tier packages.',
    },
  });
});

// ---------------- VITE & STATIC SERVING ----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
