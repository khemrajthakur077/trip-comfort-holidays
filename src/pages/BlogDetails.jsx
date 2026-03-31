import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams(); // URL se blog id nikalne ke liye
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullBlog = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single(); // Sirf wahi ek blog fetch karega jiski ID match hogi

        if (error) throw error;
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFullBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center py-20 text-xl font-bold">Blog not found!</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Back Button & Image Header */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <img 
          src={blog.image_url} 
          className="w-full h-full object-cover" 
          alt={blog.title} 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-10 left-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-30 bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl">
        <div className="flex items-center gap-4 text-indigo-600 text-sm font-black uppercase tracking-widest mb-6">
          <span>{blog.category}</span>
          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
          <div className="flex items-center gap-2 text-slate-400 normal-case font-medium">
             <Calendar size={16} /> 
             {new Date(blog.created_at).toLocaleDateString()}
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
          {blog.title}
        </h1>

        <div className="prose prose-indigo prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
          {/* whitespace-pre-wrap is used to keep line breaks from database */}
          <p className="whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;