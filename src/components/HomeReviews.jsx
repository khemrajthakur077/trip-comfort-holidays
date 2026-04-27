import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Star, Heart, Loader2, Quote, ExternalLink } from 'lucide-react';
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

        if (!error) setReviews(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchHomeReviews();
  }, []);

  if (loading) return (
    <div className="py-10 flex justify-center items-center">
      <Loader2 className="animate-spin text-indigo-600" size={30} />
    </div>
  );

  return (
    <section className="py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <Motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-slate-900"
          >
            What Our <span className="text-indigo-600">Guests Say</span>
          </Motion.h2>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
          {reviews.map((item, idx) => (
            <Motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="min-w-[82%] sm:min-w-[350px] md:min-w-[380px] h-full min-h-[300px] max-h-[380px] snap-center bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 text-indigo-50/80" size={50} />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-50 shadow-sm">
                  <img src={item.media_url} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">{item.guest_name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                    <MapPin size={10} strokeWidth={3} /> {item.location}
                  </div>
                </div>
              </div>

              {/* Review Text Area */}
              <div className="relative flex-grow mb-4">
                <p className="text-slate-600 italic text-sm md:text-base leading-relaxed line-clamp-4 relative z-10">
                  "{item.review_text}"
                </p>
                {/* Agar text lamba hai toh 'Read More' link dikhega */}
                {item.review_text.length > 120 && (
                  <Link 
                    to="/guestGallery" 
                    className="text-indigo-600 text-xs font-black mt-2 inline-flex items-center gap-1 hover:underline group"
                  >
                    Read full story 
                    <ExternalLink size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>

              <div className="flex justify-between items-center mt-auto border-t border-slate-50 pt-4">
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Verified</span>
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                </div>
              </div>
            </Motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link 
            to="/guestGallery" 
            className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
          >
            View All Stories
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </section>
  );
};

export default HomeReviews;