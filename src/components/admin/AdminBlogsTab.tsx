import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit3, Check, RefreshCw, Upload, Image } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { BlogPost } from '../../types';

export const AdminBlogsTab: React.FC = () => {
  const { config, updateBlogPosts, isSaving, saveConfig } = useSiteConfig();
  const { blogPosts } = config;

  const [editingId, setEditingId] = useState<string | null>(blogPosts[0]?.id || null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [newTagText, setNewTagText] = useState('');

  const activePost = blogPosts.find((p) => p.id === editingId) || blogPosts[0];

  const handleSave = async () => {
    await saveConfig();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateActive = (patch: Partial<BlogPost>) => {
    if (!activePost) return;
    const updated = blogPosts.map((p) => (p.id === activePost.id ? { ...p, ...patch } : p));
    updateBlogPosts(updated);
  };

  const handleAddNewPost = () => {
    const newId = `b-${Date.now()}`;
    const newPost: BlogPost = {
      id: newId,
      slug: `article-${Date.now()}`,
      title: 'New Agency Article',
      excerpt: 'Strategic insights and best practices in branding, design systems, and digital development.',
      category: 'Design Insights',
      author: {
        name: 'Adrian Reyes',
        role: 'Creative Director',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
      tags: ['Branding', 'Design Strategy'],
      content: `## The Modern Digital Agency Blueprint\n\nCrafting an impactful visual presence starts with clear brand principles, consistent visual language, and meticulous execution across every customer touchpoint.`,
    };
    updateBlogPosts([newPost, ...blogPosts]);
    setEditingId(newId);
  };

  const handleDeletePost = (id: string) => {
    if (blogPosts.length <= 1) {
      alert('You must retain at least one blog article.');
      return;
    }
    if (confirm('Delete this article?')) {
      const updated = blogPosts.filter((p) => p.id !== id);
      updateBlogPosts(updated);
      setEditingId(updated[0].id);
    }
  };

  const handleAddTag = () => {
    if (!newTagText.trim() || !activePost) return;
    handleUpdateActive({ tags: [...activePost.tags, newTagText.trim()] });
    setNewTagText('');
  };

  const handleRemoveTag = (index: number) => {
    if (!activePost) return;
    handleUpdateActive({ tags: activePost.tags.filter((_, i) => i !== index) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activePost) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleUpdateActive({ coverImage: reader.result });
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
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span>Blog & Article CMS</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Write, edit, and publish agency thought leadership articles, cover images, and markdown content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNewPost}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>New Article</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Articles'}</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Articles updated successfully!</span>
        </div>
      )}

      {/* Article selector grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {blogPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => setEditingId(post.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              editingId === post.id
                ? 'border-cyan-400 bg-slate-800/90 shadow-md shadow-cyan-500/10'
                : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-1">
                {post.category}
              </span>
              <h4 className="text-xs font-extrabold text-white line-clamp-2">{post.title}</h4>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>{post.publishedAt}</span>
              <span>{post.readTime}</span>
            </div>
          </button>
        ))}
      </div>

      {activePost && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-cyan-400" />
              <span>Editing Article</span>
            </h3>
            <button
              onClick={() => handleDeletePost(activePost.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1.5">Article Title</label>
              <input
                type="text"
                value={activePost.title}
                onChange={(e) => handleUpdateActive({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Category</label>
              <input
                type="text"
                value={activePost.category}
                onChange={(e) => handleUpdateActive({ category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Author Name</label>
              <input
                type="text"
                value={activePost.author.name}
                onChange={(e) =>
                  handleUpdateActive({ author: { ...activePost.author, name: e.target.value } })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Read Time</label>
              <input
                type="text"
                value={activePost.readTime}
                onChange={(e) => handleUpdateActive({ readTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Publish Date</label>
              <input
                type="text"
                value={activePost.publishedAt}
                onChange={(e) => handleUpdateActive({ publishedAt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 font-semibold mb-1.5">Short Excerpt / Preview Summary</label>
              <textarea
                rows={2}
                value={activePost.excerpt}
                onChange={(e) => handleUpdateActive({ excerpt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Cover image */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Image className="w-4 h-4 text-cyan-400" />
              <span>Article Cover Image</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs">
              <div className="md:col-span-8 space-y-3">
                <input
                  type="text"
                  value={activePost.coverImage}
                  onChange={(e) => handleUpdateActive({ coverImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs"
                />
                <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl bg-slate-950/60 cursor-pointer text-slate-300 hover:text-white">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload Local Cover Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="md:col-span-4 h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={activePost.coverImage} alt="Article cover" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Full content editor */}
          <div className="pt-6 border-t border-slate-800/80 space-y-2">
            <label className="block text-slate-300 font-semibold text-sm">Article Markdown Body</label>
            <textarea
              rows={8}
              value={activePost.content}
              onChange={(e) => handleUpdateActive({ content: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-cyan-400"
              placeholder="# Heading 1&#10;&#10;Write markdown content here..."
            />
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white">Article Topic Tags</h4>
            <div className="flex flex-wrap gap-2">
              {activePost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 flex items-center gap-2"
                >
                  <span>#{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(idx)}
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
                value={newTagText}
                onChange={(e) => setNewTagText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add tag..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl cursor-pointer"
              >
                Add Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
