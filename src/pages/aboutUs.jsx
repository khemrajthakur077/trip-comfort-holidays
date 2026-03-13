import React from 'react';
import { ShieldCheck, Map, Users, Award, Heart, Sparkles, Star, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const stats = [
    { label: "Happy Travelers", value: "2.5k+", icon: <Users className="text-[#4F46E5]" /> },
    { label: "Successful Tours", value: "1.8k+", icon: <CheckCircle2 className="text-[#4F46E5]" /> },
    { label: "Positive Reviews", value: "99%", icon: <Star className="text-[#4F46E5]" /> },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-[#4F46E5] py-20 lg:py-32 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <nav className="flex justify-center gap-2 text-indigo-200 text-sm mb-6 font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-white">Home</Link> 
            <span>|</span> 
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl lg:text-7xl font-black text-white tracking-tight mb-6">
            We craft comfortable, <br />
            <span className="text-indigo-200">hassle-free journeys.</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            From cozy stays in the Himalayas to expert local guides and reliable transport, we handle every detail across India and beyond.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-[#4F46E5] px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-50 transition">Find Out More</button>
            <button className="flex items-center gap-2 bg-indigo-600/50 text-white px-8 py-4 rounded-2xl font-black border border-indigo-400 hover:bg-indigo-600 transition">
              <PlayCircle size={24} /> Watch Our Tours
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-indigo-50 flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Google Reviews Badge */}
        <div className="mt-6 flex justify-center">
            <div className="bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                <div className="flex text-yellow-400"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <span className="text-sm font-bold">5.0 Rating based on Google reviews</span>
            </div>
        </div>
      </div>

      {/* --- WHO WE ARE SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-50">
             <img src="https://images.unsplash.com/photo-1589136777351-fdc9c9c85f68?q=80&w=2000" alt="Shimla Landscape" className="w-full h-[550px] object-cover" />
          </div>
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-indigo-50">
             <p className="text-[#4F46E5] font-black text-sm uppercase tracking-tighter">Himalayan Heart</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Himalayan Heart & <span className="text-[#4F46E5]">Global Reach.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Based in **Shimla**, we specialize in seamless group tours, corporate getaways, and cultural adventures. We make your travels relaxing, memorable, and tailored just for you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-indigo-500">
                  <h4 className="font-bold text-slate-800">Affordable Comfort</h4>
                  <p className="text-sm text-slate-500">Premium tours at budget prices with exclusive deals.</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-green-500">
                  <h4 className="font-bold text-slate-800">Safety First</h4>
                  <p className="text-sm text-slate-500">Always-on safety protocols for every traveler.</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-orange-500">
                  <h4 className="font-bold text-slate-800">Expert Local Guides</h4>
                  <p className="text-sm text-slate-500">Shimla-based pros sharing hidden stories.</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-indigo-500">
                  <h4 className="font-bold text-slate-800">24/7 Support</h4>
                  <p className="text-sm text-slate-500">Hindi/English help around the clock.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- LOCATION SECTION --- */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <span className="text-[#4F46E5] font-black uppercase tracking-widest text-sm">Visit Our Office</span>
                    <h3 className="text-4xl font-black text-slate-900">Mandi Head Office</h3>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        House No. 203/5, Bharoh, Near Mini Secretariat <br/>
                        Sundernagar, Mandi, Himachal Pradesh 175018
                    </p>
                    <a href="https://maps.google.com" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition">Get Directions</a>
                </div>
                <div className="flex-1 w-full h-[300px] bg-indigo-100 rounded-[2rem] flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1948" alt="Office Location" className="w-full h-full object-cover opacity-80" />
                </div>
            </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-[#4F46E5] rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-white">Grab Great Deals Now <br/> <span className="text-indigo-200">25% Off Across India</span></h2>
            <p className="text-indigo-100 max-w-xl mx-auto text-lg opacity-90">Secure your spot in seconds via our website—perfect for quick youth group trips.</p>
            <Link to="/contact" className="inline-block bg-white text-[#4F46E5] px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">Book My Adventure</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;