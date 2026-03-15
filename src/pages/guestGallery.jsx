import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 
// Sabse important line niche wali hai, dhyan se dekho 'Heart' add kar diya hai
import { MapPin, PlayCircle, Quote, Star, Loader2, Heart } from 'lucide-react';

const GuestGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Honeymoon', 'Adventure', 'International', 'Family'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('guest_gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error:', error);
        } else {
          setGalleryItems(data || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.tag === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Our <span className="text-[#4F46E5]">Happy Guests</span></h1>
          <p className="text-slate-500 font-medium italic">Capturing memories and stories from our travelers.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeFilter === f ? 'bg-[#4F46E5] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-[#4F46E5]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 flex flex-col">
                
                <div className="relative h-72 overflow-hidden">
                  {item.media_type === 'video' ? (
                    <div className="relative h-full w-full">
                      <video 
                        src={item.media_url} 
                        className="w-full h-full object-cover"
                        muted loop
                        onMouseOver={e => e.target.play()}
                        onMouseOut={e => e.target.pause()}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle className="text-white opacity-80" size={48} />
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={item.media_url} 
                      alt={item.location} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  )}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <MapPin size={14} className="text-[#4F46E5]" />
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">{item.location}</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-3 text-indigo-50 w-8 h-8 -z-0" />
                    <p className="text-slate-600 text-sm leading-relaxed italic relative z-10">
                      "{item.review_text}"
                    </p>
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm tracking-tight">{item.guest_name}</h4>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase">{item.tag}</p>
                    </div>
                    {/* Yahan par Heart use ho raha tha jo crash kar raha tha */}
                    <div className="h-8 w-8 bg-indigo-50 rounded-full flex items-center justify-center">
                       <Heart size={14} className="text-indigo-500 fill-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestGallery;