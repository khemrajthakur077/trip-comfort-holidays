import React, { useState } from 'react';
import { Users, BadgePercent, ShieldCheck, Globe, Handshake, Send, CheckCircle2, Briefcase } from 'lucide-react';

const JoinUsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const benefits = [
    {
      title: "Exclusive B2B Rates",
      desc: "Get the best industry margins on Himachal & International packages.",
      icon: <BadgePercent className="text-green-500" />
    },
    {
      title: "24/7 Ground Support",
      desc: "Our Shimla & Mandi teams are always available for your guests.",
      icon: <ShieldCheck className="text-[#4F46E5]" />
    },
    {
      title: "Custom White-Labeling",
      desc: "Get itineraries with your own branding to share with clients.",
      icon: <Briefcase className="text-orange-500" />
    },
    {
      title: "Global Inventory",
      desc: "Access to 150+ verified hotels and reliable transport fleets.",
      icon: <Globe className="text-indigo-400" />
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 pt-20 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#4F46E5]/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="inline-block bg-[#4F46E5] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            B2B Partnership Program
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Grow Your Business with <br />
            <span className="text-[#4F46E5]">Trip Comfort Holidays</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Join our network of 500+ travel agents and offer your clients the most comfortable Himalayan experiences.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Benefits (Sticky on Desktop) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Handshake className="text-[#4F46E5]" /> Partner Benefits
              </h2>
              <div className="space-y-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{b.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#4F46E5] p-8 rounded-[2.5rem] text-white shadow-xl">
               <h3 className="text-xl font-black mb-4">Need Help Joining?</h3>
               <p className="text-indigo-100 text-sm mb-6">Contact our B2B Manager directly for urgent onboarding.</p>
               <a href="tel:8091655570" className="block text-center bg-white text-[#4F46E5] py-3 rounded-xl font-bold hover:bg-indigo-50 transition">Call B2B Support</a>
            </div>
          </div>

          {/* RIGHT: Registration Form */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-slate-100">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={64} />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Application Received!</h2>
                <p className="text-slate-500 font-medium max-w-sm">
                  Our partnership team will review your agency details and get back to you within 24 hours.
                </p>
                <button onClick={() => setIsSent(false)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition">Back to Form</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Agent Registration</h2>
                  <p className="text-slate-500 font-medium">Please fill in your agency details to get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Agency Name</label>
                    <input required type="text" placeholder="e.g. Dream Travels" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Owner Name</label>
                    <input required type="text" placeholder="Full Name" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Email Address</label>
                    <input required type="email" placeholder="agency@mail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Phone Number</label>
                    <input required type="tel" placeholder="+91 00000-00000" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Office City / State</label>
                  <input required type="text" placeholder="e.g. Chandigarh, Punjab" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-medium" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">About Your Agency</label>
                  <textarea rows="3" placeholder="Number of years in business, main client type, etc..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] focus:bg-white outline-none transition-all font-medium resize-none"></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-[#4F46E5] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting Application..." : <><Send size={20} /> Register as Partner</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;