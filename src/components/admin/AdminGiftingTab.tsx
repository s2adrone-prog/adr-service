import React, { useState } from 'react';
import { Gift, Plus, Trash2, Edit3, Check, RefreshCw, Upload, Image } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { GiftingProduct } from '../../types';

export const AdminGiftingTab: React.FC = () => {
  const { config, updateGiftingProducts, isSaving, saveConfig } = useSiteConfig();
  const { giftingProducts } = config;

  const [editingId, setEditingId] = useState<string | null>(giftingProducts[0]?.id || null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [newMethodText, setNewMethodText] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  const activeProduct = giftingProducts.find((p) => p.id === editingId) || giftingProducts[0];

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateActive = (patch: Partial<GiftingProduct>) => {
    if (!activeProduct) return;
    const updated = giftingProducts.map((p) => (p.id === activeProduct.id ? { ...p, ...patch } : p));
    updateGiftingProducts(updated);
  };

  const handleAddNewProduct = () => {
    const newId = `g-item-${Date.now()}`;
    const newProd: GiftingProduct = {
      id: newId,
      name: 'Custom Premium Item',
      category: 'accessories',
      minQuantity: 10,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      colors: ['#000000', '#ffffff', '#0a1128'],
      description: 'High-quality corporate merchandise customized with your logo or custom artwork.',
      printMethods: ['Screen Printing', 'Heat Transfer Vinyl'],
      basePrice: 499,
    };
    updateGiftingProducts([...giftingProducts, newProd]);
    setEditingId(newId);
  };

  const handleDeleteProduct = (id: string) => {
    if (giftingProducts.length <= 1) {
      alert('You must retain at least one product in the merchandise catalog.');
      return;
    }
    if (confirm('Delete this merchandise product?')) {
      const updated = giftingProducts.filter((p) => p.id !== id);
      updateGiftingProducts(updated);
      setEditingId(updated[0].id);
    }
  };

  const handleAddPrintMethod = () => {
    if (!newMethodText.trim() || !activeProduct) return;
    handleUpdateActive({ printMethods: [...activeProduct.printMethods, newMethodText.trim()] });
    setNewMethodText('');
  };

  const handleRemovePrintMethod = (index: number) => {
    if (!activeProduct) return;
    handleUpdateActive({ printMethods: activeProduct.printMethods.filter((_, i) => i !== index) });
  };

  const handleAddColor = () => {
    if (!activeProduct) return;
    if (activeProduct.colors.includes(newColorHex)) return;
    handleUpdateActive({ colors: [...activeProduct.colors, newColorHex] });
  };

  const handleRemoveColor = (hex: string) => {
    if (!activeProduct) return;
    handleUpdateActive({ colors: activeProduct.colors.filter((c) => c !== hex) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeProduct) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleUpdateActive({ image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Gift className="w-6 h-6 text-cyan-400" />
            <span>Custom Gifting & Merchandise Catalog</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Configure custom printable merchandise, minimum order quantities, print methods, and apparel colors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNewProduct}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Merchandise</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Products'}</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Gifting catalog updated successfully!</span>
        </div>
      )}

      {/* Product selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {giftingProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => setEditingId(p.id)}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center ${
              editingId === p.id
                ? 'border-cyan-400 bg-slate-800/90 shadow-md shadow-cyan-500/10'
                : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-950">
              <img src={p.image} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-bold text-white text-center line-clamp-1 w-full">{p.name}</span>
            <span className="text-[10px] text-cyan-400">Min {p.minQuantity} pcs</span>
          </button>
        ))}
      </div>

      {activeProduct && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-cyan-400" />
              <span>Editing: {activeProduct.name}</span>
            </h3>
            <button
              onClick={() => handleDeleteProduct(activeProduct.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Merchandise Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1.5">Product Name</label>
              <input
                type="text"
                value={activeProduct.name}
                onChange={(e) => handleUpdateActive({ name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Category</label>
              <select
                value={activeProduct.category}
                onChange={(e) => handleUpdateActive({ category: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"
              >
                <option value="wearable">Wearables & Apparel</option>
                <option value="drinkware">Drinkware & Bottles</option>
                <option value="accessories">Tech & Desk Accessories</option>
                <option value="stationery">Stationery & Notebooks</option>
                <option value="kits">VIP Welcome Swag Kits</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Minimum Order Quantity (MOQ)</label>
              <input
                type="number"
                value={activeProduct.minQuantity}
                onChange={(e) => handleUpdateActive({ minQuantity: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Base Unit Price (₹)</label>
              <input
                type="number"
                value={activeProduct.basePrice || 0}
                onChange={(e) => handleUpdateActive({ basePrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 font-semibold mb-1.5">Description & Material Specs</label>
              <textarea
                rows={2}
                value={activeProduct.description}
                onChange={(e) => handleUpdateActive({ description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
          </div>

          {/* Product Image asset */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Image className="w-4 h-4 text-cyan-400" />
              <span>Product Mockup Image</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs">
              <div className="md:col-span-8 space-y-3">
                <input
                  type="text"
                  value={activeProduct.image}
                  onChange={(e) => handleUpdateActive({ image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs"
                />
                <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl bg-slate-950/60 cursor-pointer text-slate-300 hover:text-white">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload Local Product Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="md:col-span-4 h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={activeProduct.image} alt="Product" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Color swatches */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Available Apparel / Material Colors</h4>
            <div className="flex flex-wrap gap-3 items-center">
              {activeProduct.colors.map((hex, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs"
                >
                  <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: hex }} />
                  <span className="font-mono text-slate-300 text-[11px]">{hex}</span>
                  <button
                    onClick={() => handleRemoveColor(hex)}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-700 cursor-pointer"
                />
                <button
                  onClick={handleAddColor}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Add Color
                </button>
              </div>
            </div>
          </div>

          {/* Print methods */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Print & Branding Methods</h4>
            <div className="flex flex-wrap gap-2">
              {activeProduct.printMethods.map((method, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 flex items-center gap-2"
                >
                  <span>{method}</span>
                  <button
                    onClick={() => handleRemovePrintMethod(idx)}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <input
                type="text"
                value={newMethodText}
                onChange={(e) => setNewMethodText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPrintMethod()}
                placeholder="Add print method (e.g. Laser Engraving, DTG Print)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddPrintMethod}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
              >
                Add Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
