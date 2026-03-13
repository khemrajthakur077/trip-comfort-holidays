import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { MapPin, Clock, Send, CheckCircle2, XCircle, Calendar, Loader2, Phone } from 'lucide-react';

const DynamicTourPage = () => {
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  const phone = "8091655570";

  useEffect(() => {
    if (!id) return;

    const fetchTourDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("packages")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;

        if (data && typeof data.itinerary === "string") {
          try {
            data.itinerary = JSON.parse(data.itinerary);
          } catch {
            data.itinerary = [];
          }
        }
        setTourData(data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-[#4F46E5]" size={48} />
        <p className="text-slate-500 font-medium mt-4 animate-pulse">Designing your perfect escape...</p>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="text-center py-20 bg-white min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Package Not Found</h1>
        <p className="text-slate-500 mb-8 text-lg">We couldn't find the tour you're looking for.</p>
        <button onClick={() => window.history.back()} className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
          Go Back
        </button>
      </div>
    );
  }

  const waMessage = encodeURIComponent(`Hi! I'm interested in booking the "${tourData.title}" package. Please share more details.`);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 lg:pb-12">
      
      {/* Mobile Bottom Bar (Z-Index High) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-[100] flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div>
          <p className="text-xs text-slate-400 line-through font-medium">₹{tourData.old_price}</p>
          <p className="text-2xl font-black text-[#4F46E5]">₹{tourData.price}</p>
        </div>
        <a href={`https://wa.me/91${phone}?text=${waMessage}`} className="bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition">
          <Send size={18} /> Book Now
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <header className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                <span className="w-2 h-2 bg-[#4F46E5] rounded-full animate-pulse"></span>
                {tourData.category || "Premium Tour"}
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {tourData.title}
              </h1>
              {tourData.subtitle && <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">{tourData.subtitle}</p>}
              
              <div className="flex flex-wrap gap-4 pt-2 text-slate-600 font-bold text-sm">
                <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                  <Clock size={18} className="text-[#4F46E5]"/> <span>{tourData.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                  <MapPin size={18} className="text-[#4F46E5]"/> <span>{tourData.destination || tourData.to_location}</span>
                </div>
              </div>
            </header>

            {/* Main Image with Zoom Effect */}
            <div className="rounded-[3rem] overflow-hidden h-[350px] lg:h-[500px] shadow-2xl border-8 border-white group relative">
                <img src={tourData.image_url} alt={tourData.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black mb-12 flex items-center gap-4 text-slate-900">
                <Calendar className="text-[#4F46E5]" size={32} /> Journey Timeline
              </h2>

              <div className="space-y-12 relative before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-50">
                {Array.isArray(tourData.itinerary) ? tourData.itinerary.map((item, index) => (
                  <div key={index} className="relative pl-12 group">
                    <div className="absolute left-[-2px] top-1 w-9 h-9 bg-white border-4 border-[#4F46E5] text-[#4F46E5] rounded-full flex items-center justify-center text-sm font-black z-10 group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300 shadow-lg shadow-indigo-100">
                      {index + 1}
                    </div>
                    <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border-2 border-transparent group-hover:border-indigo-50 group-hover:bg-white transition-all shadow-sm">
                      <h3 className="text-2xl font-black text-slate-800 mb-3">{item.title || item.day}</h3>
                      {item.highlight && <div className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-md mb-4 uppercase tracking-wider italic font-sans">⭐ {item.highlight}</div>}
                      <ul className="text-slate-600 space-y-2">
                        {item.spots && Array.isArray(item.spots) ? item.spots.map((spot, i) => (
                          <li key={i} className="flex items-center gap-3 text-base leading-relaxed">• {spot}</li>
                        )) : item.stay && <li className="text-base font-medium flex items-center gap-2">🏨 Stay: <span className="text-indigo-600">{item.stay}</span></li>}
                      </ul>
                    </div>
                  </div>
                )) : <p className="pl-12 text-slate-400 italic">Preparing your itinerary...</p>}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-indigo-50/30 p-10 rounded-[2.5rem] border border-indigo-50">
                  <h3 className="text-indigo-900 text-xl font-black mb-6 flex items-center gap-3"><CheckCircle2 size={24} className="text-[#4F46E5]"/> What's Included</h3>
                  <p className="text-slate-600 text-sm leading-[1.8] font-medium whitespace-pre-line">{tourData.inclusions || 'Please contact for details'}</p>
               </div>
               <div className="bg-rose-50/30 p-10 rounded-[2.5rem] border border-rose-50">
                  <h3 className="text-rose-900 text-xl font-black mb-6 flex items-center gap-3"><XCircle size={24} className="text-rose-500"/> What's Excluded</h3>
                  <p className="text-slate-600 text-sm leading-[1.8] font-medium whitespace-pre-line">{tourData.exclusions || 'Please contact for details'}</p>
               </div>
            </div>
          </div>

          {/* RIGHT: Price Card (Sticky Fixed) */}
          <div className="relative">
            {/* top-28 ensures it stays below your sticky header */}
            <div className="lg:sticky lg:top-28 space-y-6 z-20">
              <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative border border-slate-800">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative z-10">
                  <div className="bg-[#4F46E5] w-fit px-5 py-1.5 rounded-full text-xs font-black mb-6 uppercase tracking-widest shadow-lg shadow-indigo-900/50">
                    SAVE ₹{tourData.old_price - tourData.price}
                  </div>
                  <p className="text-slate-500 line-through font-bold text-lg mb-1">₹{tourData.old_price}</p>
                  <div className="flex items-baseline gap-2 mb-10">
                    <h2 className="text-6xl font-black tracking-tighter text-white">₹{tourData.price}</h2>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">/ person</span>
                  </div>
                  <a href={`https://wa.me/91${phone}?text=${waMessage}`} className="w-full bg-[#4F46E5] hover:bg-indigo-700 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-950/20 active:scale-95 group">
                    <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Get Free Quote
                  </a>
                </div>
              </div>

              {/* Instant Help Widget */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#4F46E5] mb-4">
                  <Phone size={20} />
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2 tracking-tight">Need Assistance?</h4>
                <p className="text-sm text-slate-500 font-medium mb-5 leading-relaxed">Talk to our travel experts for a customized itinerary.</p>
                <a href={`tel:${phone}`} className="text-slate-900 font-black text-xl hover:text-[#4F46E5] transition-colors">
                  +91 80916-55570
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DynamicTourPage;