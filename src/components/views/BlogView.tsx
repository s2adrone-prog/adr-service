import React, { useState } from 'react';
import { FileText, Search, ArrowRight, User, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../../data/mockData';
import { BlogPost, PageRoute } from '../../types';

interface BlogViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuote: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate, onOpenQuote }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {selectedPost ? (
        /* Full Article Detail Reader View */
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-xs font-bold text-cyan-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center space-x-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <img src={selectedPost.author.avatar} alt={selectedPost.author.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-slate-200 font-semibold">{selectedPost.author.name}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedPost.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedPost.readTime}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden h-72 md:h-96 border border-slate-800 shadow-2xl">
            <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-3xl space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
            {selectedPost.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-slate-950 font-bold flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black">Need Creative Design or Engineering Strategy?</h3>
              <p className="text-xs text-slate-900 mt-0.5">Consult with ADR E-Store's senior creative leads today.</p>
            </div>
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 bg-slate-950 text-cyan-400 font-extrabold rounded-xl hover:bg-slate-900 text-xs shrink-0 cursor-pointer"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      ) : (
        /* Blog Listing View */
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center space-x-1.5">
              <FileText className="w-4 h-4" />
              <span>ADR Insights & Articles</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Design, Branding & Tech Insights
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              In-depth articles on corporate identity trends, React & mobile performance, and corporate merchandise strategies.
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['all', 'Corporate Branding', 'Development', 'Custom Gifting'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                      selectedCategory === cat
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Topics' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-slate-950/90 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-800">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 text-xs text-slate-400">
                  <span>{post.readTime}</span>
                  <span className="font-bold text-cyan-400 group-hover:underline flex items-center space-x-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
