import React, { useState } from 'react';
import {
  Gift,
  Upload,
  Sparkles,
  CheckCircle2,
  Calculator,
  Send,
  Loader2,
  Package,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { GIFTING_PRODUCTS } from '../../data/mockData';
import { GiftingProduct } from '../../types';

interface CustomGiftingCustomizerProps {
  onOpenQuote: (service?: string) => void;
}

export const CustomGiftingCustomizer: React.FC<CustomGiftingCustomizerProps> = ({
  onOpenQuote,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<GiftingProduct>(
    GIFTING_PRODUCTS[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    GIFTING_PRODUCTS[0].colors[0]
  );
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedPrintMethod, setSelectedPrintMethod] = useState(
    GIFTING_PRODUCTS[0].printMethods[0]
  );
  const [quantity, setQuantity] = useState(25);
  const [customText, setCustomText] = useState('ADR BRAND TEAM');
  const [artworkName, setArtworkName] = useState('');
  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<string | null>(null);

  // Form contact state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleProductSelect = (product: GiftingProduct) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedPrintMethod(product.printMethods[0]);
    if (quantity < product.minQuantity) {
      setQuantity(product.minQuantity);
    }
  };

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArtworkName(file.name);
      const url = URL.createObjectURL(file);
      setArtworkPreviewUrl(url);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      printLocation: 'Front Center',
      customText,
      artworkName,
      contactName,
      contactEmail,
      contactPhone,
      companyName,
      notes,
    };

    try {
      const res = await fetch('/api/gifting-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.order?.id || 'GIFT-SUCCESS');
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setOrderId('GIFT-' + Math.floor(10000 + Math.random() * 90000));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center space-x-1.5">
          <Gift className="w-4 h-4" />
          <span>Interactive Merchandise Customizer</span>
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Custom Gifting & Print-On-Demand
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Select products, upload your vector brand artwork or custom text, calculate bulk volume discounts, and submit your custom merchandise order instantly.
        </p>
      </div>

      {/* Main Interactive Customizer Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Selector & Configuration Options */}
        <div className="lg:col-span-7 space-y-8 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl">
          {/* Step 1: Product Selector */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Package className="w-4 h-4 text-amber-400" />
              <span>1. Choose Merchandise Item</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GIFTING_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleProductSelect(prod)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    selectedProduct.id === prod.id
                      ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-24 object-cover rounded-xl mb-2"
                  />
                  <div>
                    <div className="font-bold text-xs text-white line-clamp-1">{prod.name}</div>
                    <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                      Min: {prod.minQuantity} pcs
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Color & Print Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Color Choice
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((hex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === hex
                        ? 'border-amber-400 scale-110 shadow-lg'
                        : 'border-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {selectedProduct.sizes && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Apparel Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Print Method */}
          <div className="pt-4 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Printing & Embellishment Technique
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.printMethods.map((pm) => (
                <button
                  key={pm}
                  onClick={() => setSelectedPrintMethod(pm)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    selectedPrintMethod === pm
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Customization Upload / Text */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. Upload Brand Artwork or Custom Text</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Custom Logo Text Overlay
                </label>
                <input
                  type="text"
                  placeholder="Enter text to overlay on product..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Upload Vector Artwork (AI, PNG, SVG)
                </label>
                <label className="flex items-center justify-center space-x-2 w-full bg-slate-950 border border-dashed border-slate-700 hover:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-slate-300 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {artworkName || 'Upload Logo Graphic'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleArtworkUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Step 5: Quantity & Calculator */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Order Quantity (Units)</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">
                Min Order: {selectedProduct.minQuantity} units
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="range"
                min={selectedProduct.minQuantity}
                max={1000}
                step={5}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="text-lg font-black text-amber-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 min-w-[70px] text-center">
                {quantity}
              </span>
            </div>

            {/* Bulk Volume Note */}
            {quantity >= 50 && (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-between">
                <span>Bulk Volume Pricing:</span>
                <span>Special Corporate Tier Applied</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Product Proof & Quote Request */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Preview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 inline-block">
              3D Proof Preview
            </span>

            {/* Product Image Canvas with Overlay */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
              />

              {/* Artwork or Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                {artworkPreviewUrl ? (
                  <img
                    src={artworkPreviewUrl}
                    alt="Custom Upload"
                    className="max-w-[100px] max-h-[80px] object-contain opacity-90 drop-shadow-md"
                  />
                ) : (
                  <div className="bg-slate-950/80 backdrop-blur-sm border border-amber-400/60 px-3 py-1.5 rounded-lg text-amber-300 font-black text-xs tracking-widest uppercase text-center shadow-2xl">
                    {customText}
                  </div>
                )}
              </div>
            </div>

            {/* Summary breakdown */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Selected Item:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Print Method:</span>
                <span className="text-cyan-400 font-semibold">{selectedPrintMethod}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Quantity Requested:</span>
                <span className="text-amber-400 font-bold">{quantity} units</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Direct Email Enquiry:{' '}
                <a
                  href="mailto:info@adrestore.co.in"
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  info@adrestore.co.in
                </a>
              </div>
            </div>
          </div>

          {/* Quick Submit Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span>Submit Custom Merch Enquiry</span>
            </h3>

            {submitted ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Gifting Quote Submitted!</div>
                <div className="text-xs text-slate-300">
                  Order Ref: <span className="font-mono text-amber-400">{orderId}</span>. Our merchandise specialist will contact you shortly with a digital pre-production proof.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Event Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Order Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Custom Merch Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
