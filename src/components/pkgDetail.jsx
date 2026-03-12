import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { MapPin, Clock, Send, CheckCircle2, XCircle, Calendar, Loader2 } from 'lucide-react';

const DynamicTourPage = () => {
const { id } = useParams();

console.log("ID:", id);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  const phone = "8091655570";

  useEffect(() => {

  console.log("URL PARAM ID:", id);

  if (!id) {
    console.error("ID missing from URL");
    return;
  }

  const fetchTourDetails = async () => {
    try {

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      if (!data) {
        console.error("No package found:", id);
        return;
      }

      if (typeof data.itinerary === "string") {
        try {
          data.itinerary = JSON.parse(data.itinerary);
        } catch {
          data.itinerary = [];
        }
      }

      setTourData(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchTourDetails();

}, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
        <p className="text-slate-500 font-medium animate-pulse">Fetching best deals for you...</p>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="text-center py-20 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Package Not Found!</h1>
        <p className="text-slate-500">The ID "{id}" does not match any package in our database.</p>
        <button onClick={() => window.history.back()} className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-xl">Go Back</button>
      </div>
    );
  }

  const waMessage = encodeURIComponent(`Hi! I want to book the ${tourData.title} package for ₹${tourData.price}. Please share details.`);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 lg:pb-0">
      
      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 flex justify-between items-center shadow-2xl">
        <div>
          <p className="text-sm text-slate-400 line-through">₹{tourData.old_price}</p>
          <p className="text-xl font-bold text-orange-600">₹{tourData.price}</p>
        </div>
        <a href={`https://wa.me/91${phone}?text=${waMessage}`} className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
          <Send size={18} /> Book Now
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                {tourData.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {tourData.title}
              </h1>
              {tourData.subtitle && <p className="text-lg text-slate-500 italic">{tourData.subtitle}</p>}
              
              <div className="flex flex-wrap gap-4 text-slate-600">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border shadow-sm">
                  <Clock size={18} className="text-orange-500"/> <span>{tourData.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border shadow-sm">
                  <MapPin size={18} className="text-orange-500"/> <span>{tourData.destination || tourData.to_location}</span>
                </div>
              </div>
            </header>

            {/* Main Image */}
            <div className="rounded-[2.5rem] overflow-hidden h-[300px] lg:h-[450px] shadow-lg border-4 border-white">
               <img src={tourData.image_url} alt={tourData.title} className="w-full h-full object-cover" />
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 italic text-indigo-900">
                <Calendar className="text-orange-600" /> JOURNEY TIMELINE
              </h2>

              <div className="space-y-12 relative before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-orange-50">
                {Array.isArray(tourData.itinerary) ? tourData.itinerary.map((item, index) => (
                  <div key={index} className="relative pl-12 group">
                    <div className="absolute left-0 top-1 w-9 h-9 bg-white border-4 border-orange-600 text-orange-600 rounded-full flex items-center justify-center text-sm font-black z-10 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-md">
                      {index + 1}
                    </div>
                    <div className="bg-slate-50/50 p-6 rounded-3xl border border-transparent group-hover:border-orange-100 group-hover:bg-white transition-all shadow-sm">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Day {index + 1}: {item.title || item.day}</h3>
                      {item.highlight && <p className="text-orange-700 font-semibold text-sm mb-2">⭐ {item.highlight}</p>}
                      <ul className="text-slate-600 space-y-1">
                        {item.spots && Array.isArray(item.spots) ? item.spots.map((spot, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">• {spot}</li>
                        )) : item.stay && <li className="text-sm">🏨 {item.stay}</li>}
                      </ul>
                    </div>
                  </div>
                )) : <p className="pl-12 text-slate-500 italic">Itinerary details loading...</p>}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-green-50/50 p-8 rounded-[2rem] border border-green-100">
                  <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={20}/> What's Included</h3>
                  <p className="text-slate-600 text-sm leading-loose whitespace-pre-line">{tourData.inclusions || 'Please contact for details'}</p>
               </div>
               <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100">
                  <h3 className="text-red-800 font-bold mb-4 flex items-center gap-2"><XCircle size={20}/> What's Excluded</h3>
                  <p className="text-slate-600 text-sm leading-loose whitespace-pre-line">{tourData.exclusions || 'Please contact for details'}</p>
               </div>
            </div>
          </div>

          {/* Right Price Card */}
          <div className="relative">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10">
                  <div className="bg-orange-600 w-fit px-4 py-1 rounded-full text-xs font-bold mb-4">
                    SAVE ₹{tourData.old_price - tourData.price}
                  </div>
                  <p className="text-slate-400 line-through">₹{tourData.old_price}</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <h2 className="text-5xl font-black">₹{tourData.price}</h2>
                    <span className="text-slate-400">/ person</span>
                  </div>
                  <a href={`https://wa.me/91${phone}?text=${waMessage}`} className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20">
                    <Send size={20}/> Get Free Quote
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DynamicTourPage;