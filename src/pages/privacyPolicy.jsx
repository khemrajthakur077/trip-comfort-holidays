import React from 'react';
import { ShieldCheck, Lock, Eye, UserCheck, Cookie, RefreshCw, Mail, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const lastUpdated = "March 2026";

  const sections = [
    {
      title: "What We Collect",
      icon: <Eye className="text-[#4F46E5]" size={24} />,
      content: "We collect your Name, email, phone number, and specific travel details (destinations, dates, budget, group size). We also collect billing info (though we do not store card details) and technical data like your IP, device type, and browser. For group tours, we may collect participant details with your explicit consent."
    },
    {
      title: "How We Use Your Data",
      icon: <UserCheck className="text-[#4F46E5]" size={24} />,
      content: "Your information helps us craft personalized packages, handle inquiries, send booking updates, and process refunds. We also use it to suggest Himachal adventures tailored to your taste. Marketing emails are only sent if you choose to opt-in."
    },
    {
      title: "Sharing & Protection",
      icon: <Lock className="text-[#4F46E5]" size={24} />,
      content: "Your data is never sold. It is shared only with trusted partners (hotels, transport providers), legal authorities, or our internal team for seamless coordination. Data is stored securely with encryption, and our Shimla office strictly complies with Indian data protection laws."
    },
    {
      title: "Cookies & Tracking",
      icon: <Cookie className="text-[#4F46E5]" size={24} />,
      content: "We use cookies to improve your browsing experience and manage bookings effectively. You can manage or disable cookies through your individual browser settings at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-[#4F46E5] pt-20 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white font-bold text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Privacy <span className="text-indigo-200">Policy</span>
          </h1>
          <p className="text-indigo-100 text-lg font-medium opacity-90">
            Your privacy is our top priority ❤️. Learn how we protect your journey's data.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-slate-100 space-y-12">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-8">
            <div className="flex items-center gap-3 text-slate-400">
                <RefreshCw size={18} className="animate-spin-slow" />
                <span className="text-sm font-bold uppercase tracking-widest">Last Updated: {lastUpdated}</span>
            </div>
            <ShieldCheck size={40} className="text-[#4F46E5] opacity-20" />
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">{section.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium pl-2 md:pl-16">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* --- YOUR RIGHTS & CONTACT --- */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white space-y-8 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#4F46E5]/20 rounded-full -mr-20 -mb-20 blur-3xl"></div>
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-black">Your Rights</h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                You have the right to request access, updates, or deletion of your data (per laws). You can also opt-out of promotional communications at any time.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Phone className="text-[#4F46E5]" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Call Support</p>
                  <p className="font-bold text-sm">+91 80916-55570</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Mail className="text-[#4F46E5]" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Email Us</p>
                  <p className="font-bold text-sm">info@tripcomfortholidays.com</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm italic">
            At Trip Comfort Holidays, we may revise this policy; please check back for the latest version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;