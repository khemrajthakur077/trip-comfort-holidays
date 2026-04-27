import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Star, Heart, Loader2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const HomeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('guest_gallery')
          .select('*')
          .order('created_at', { ascending: false }); 
          // .limit hata diya gaya hai taaki saare stories scroll mein dikhein

        if (!error) setReviews(data);
      } catch (err) { 
        console.error("Supabase Error:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchHomeReviews();
  }, []);

  if (loading) return (
    <div className="py-20 flex justify-center items-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900"
          >
            What Our <span className="text-indigo-600">Guests Say</span>
          </Motion.h2>
          <p className="text-slate-500 mt-4">Swipe to read all our amazing travel stories</p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
          {reviews.map((item, idx) => (
            <Motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className="min-w-[85%] sm:min-w-[400px] md:min-w-[450px] snap-center bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative"
            >
              <Quote className="absolute top-8 right-8 text-indigo-50/80" size={60} />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-indigo-100 p-1">
                  <img src={item.media_url} className="w-full h-full object-cover rounded-full" alt={item.guest_name} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{item.guest_name}</h4>
                  <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold uppercase tracking-wider">
                    <MapPin size={14} /> {item.location}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 italic leading-relaxed mb-8 flex-grow relative z-10">
                "{item.review_text}"
              </p>

              <div className="flex justify-between items-center mt-auto border-t border-slate-50 pt-5">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <Motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart size={20} className="text-rose-500 fill-rose-500" />
                </Motion.div>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Persistent "View All Stories" Button */}
        <div className="mt-4 text-center">
          <Link 
            to="/guestGallery" 
            className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full font-black shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
          >
            View All Stories
          </Link>
        </div>

      </div>

      {/* Custom Styles for clean look */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </section>
  );
};

export default HomeReviews;