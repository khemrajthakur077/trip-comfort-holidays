import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FileText, Plus, Trash2, Loader2, Image as ImageIcon, BookOpen } from 'lucide-react';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Travel Guide',
    content: '',
    image_url: ''
  });

  const fetchBlogs = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('blogs').insert([formData]);
      if (error) throw error;
      alert("Blog Post Published!");
      setFormData({ title: '', category: 'Travel Guide', content: '', image_url: '' });
      fetchBlogs();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Delete this blog post?")) {
      await supabase.from('blogs').delete().eq('id', id);
      fetchBlogs();
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <BookOpen className="text-blue-500" /> Content Manager
          </h1>
          <p className="text-slate-500 font-medium mt-1">Write and manage your Himachal travel stories.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- BLOG WRITER FORM --- */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4 sticky top-8">
              <h2 className="text-xl font-bold text-slate-700 mb-2">Write New Blog</h2>
              
              <input 
                type="text" placeholder="Blog Title"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-all"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required 
              />

              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Travel Guide">Travel Guide</option>
                <option value="Local News">Local News</option>
                <option value="Food & Culture">Food & Culture</option>
                <option value="Safety Tips">Safety Tips</option>
              </select>

              <input 
                type="text" placeholder="Image URL (Unsplash link)"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500"
                value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              />

              <textarea 
                placeholder="Write your story here..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 h-48 transition-all"
                value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required
              />

              <button 
                type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Publish Blog"}
              </button>
            </form>
          </div>

          {/* --- BLOG LIST --- */}
          <div className="lg:col-span-2 space-y-4">
            {fetching ? (
              <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-slate-300" size={40} /></div>
            ) : blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-all group">
                {blog.image_url ? (
                  <img src={blog.image_url} alt="" className="w-32 h-32 object-cover rounded-2xl shadow-inner" />
                ) : (
                  <div className="w-32 h-32 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200"><ImageIcon size={32} /></div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded-md">{blog.category}</span>
                      <h3 className="text-xl font-black text-slate-800 mt-2">{blog.title}</h3>
                    </div>
                    <button onClick={() => deleteBlog(blog.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2 font-medium">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;