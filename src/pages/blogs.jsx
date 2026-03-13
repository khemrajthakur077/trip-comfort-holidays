import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Apna path check kar lein

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Travel Guides", "Adventure", "Himachal Specials", "Food & Culture"];

  // --- DATABASE SE DATA FETCH KARNA ---
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // --- FILTER LOGIC ---
  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-[#4F46E5] pt-24 pb-40 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            The <span className="text-indigo-200">Travel Blog</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl font-medium opacity-90">
            Real stories and local guides from the heart of Himachal Pradesh.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        
        {/* --- CATEGORY FILTERS --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white scale-105' 
                : 'bg-white text-slate-500 hover:bg-indigo-50 hover:text-[#4F46E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- BLOG GRID / LOADING STATE --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#4F46E5] animate-spin" />
            <p className="mt-4 text-slate-500 font-medium">Fetching latest stories...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article 
                key={blog.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={blog.image_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md text-[#4F46E5] px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm">
                      {blog.category || 'Travel'}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-indigo-400" />
                      {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-indigo-400" />
                      5 min read
                    </div>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {blog.content ? blog.content.substring(0, 120) + '...' : 'No description available.'}
                  </p>

                  <div className="pt-4 border-t border-slate-50">
                    <Link 
                      to={`/blog/${blog.id}`} 
                      className="inline-flex items-center gap-2 text-[#4F46E5] font-black text-sm group/btn"
                    >
                      READ ARTICLE 
                      <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-slate-600">No blogs found in this category.</h3>
            <p className="text-slate-400">Try checking another category or come back later!</p>
          </div>
        )}

        {/* --- NEWSLETTER SECTION --- */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
           <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-black text-white">Get Himachal Updates</h3>
              <p className="text-slate-400 max-w-md mx-auto">Join our community and get the latest travel stories directly in your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#4F46E5] flex-1 font-medium transition-all"
                />
                <button className="bg-[#4F46E5] text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-600 transition shadow-lg">
                  Subscribe
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;