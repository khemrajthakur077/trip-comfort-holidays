import React, { useState } from 'react';
import { Camera, MapPin, Heart, Share2, Maximize2 } from 'lucide-react';

const GuestGallery = () => {
  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070", location: "Manali, HP", tag: "Honeymoon" },
    { id: 2, url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070", location: "Leh, Ladakh", tag: "Adventure" },
    { id: 3, url: "https://images.unsplash.com/photo-1614094450183-c0451a8424b3?q=80&w=2070", location: "Dubai, UAE", tag: "International" },
    { id: 4, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070", location: "Maldives", tag: "Luxury" }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Honeymoon', 'Adventure', 'International', 'Family'];

  const filteredImages = activeFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.tag === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Our <span className="text-[#4F46E5]">Happy Guests</span></h1>
          <p className="text-slate-500 font-medium">Capturing memories across the globe.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeFilter === f ? 'bg-[#4F46E5] text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Simplified Grid to avoid Column errors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative rounded-[2rem] overflow-hidden bg-white shadow-lg">
              <img src={image.url} alt={image.location} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-indigo-300 text-xs font-bold uppercase flex items-center gap-1">
                  <MapPin size={14} /> {image.location}
                </p>
                <h3 className="text-white text-xl font-bold">{image.tag}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GuestGallery; 