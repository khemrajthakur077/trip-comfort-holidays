import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Star, Heart, Loader2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
// Yahan humne naam badal kar 'Motion' rakha hai ESLint error hatane ke liye
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
          .order('created_at', { ascending: false })
          .limit(3);
        if (!error) setReviews(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchHomeReviews();
  }, []);

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin inline text-indigo-600" size={40} /></div>;

  return (
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            {/* Yahan 'motion' ki jagah 'Motion' use ho raha hai */}
            <Motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900"
            >
              What Our <span className="text-indigo-600">Guests Say</span>
            </Motion.h2>
            <p className="text-slate-500 mt-4 text-lg">Real stories from travelers who explored with Trip Comfort Holidays.</p>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 md:pb-0 snap-x no-scrollbar">
          {reviews.map((item, idx) => (
            <Motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="min-w-[85%] md:min-w-full snap-center bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 text-indigo-50/50" size={80} />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-indigo-100 p-1">
                  <img src={item.media_url} className="w-full h-full object-cover rounded-full" alt="" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.guest_name}</h4>
                  <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold uppercase">
                    <MapPin size={12} /> {item.location}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 italic leading-relaxed mb-6 line-clamp-4 flex-grow relative z-10">
                "{item.review_text}"
              </p>

              <div className="flex justify-between items-center mt-auto border-t pt-4">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <Motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart size={18} className="text-rose-500 fill-rose-500" />
                </Motion.div>
              </div>
            </Motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link to="/guestGallery" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
            View All Stories
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </section>
  );
};

export default HomeReviews;