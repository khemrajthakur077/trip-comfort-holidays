import React from 'react';
import { 
  FileText, ClipboardCheck, AlertCircle, Ban, Wallet, 
  Scale, ArrowLeft, Landmark, Phone, Camera, Users, ShieldAlert 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  const lastUpdated = "March 2026";

  const mainTerms = [
    {
      title: "Booking Basics",
      icon: <ClipboardCheck className="text-indigo-600" />,
      content: "50% advance payment is required to lock in your booking (subject to availability). Your booking voucher will be sent via WhatsApp/Email immediately after confirmation."
    },
    {
      title: "Payment Rules",
      icon: <Wallet className="text-green-600" />,
      content: "The remaining balance must be cleared 7 days before the trip starts. We accept UPI, Bank Transfers, or Cash—ensuring a safe and simple transaction process."
    },
    {
      title: "Cancellation Policy",
      icon: <Ban className="text-rose-500" />,
      content: "Refunds based on notice period: 100% (>30 days), 50% (15-30 days), No refund (<15 days). All notices must be sent via Email or WhatsApp."
    },
    {
      title: "Changes & Docs",
      icon: <FileText className="text-blue-500" />,
      content: "Request date or name changes 15+ days ahead (additional fees may apply). Travelers must carry valid Govt. ID proofs and necessary permits."
    },
    {
      title: "Group Vibes & Conduct",
      icon: <Users className="text-purple-600" />,
      content: "Be respectful—no damage to property, follow eco-friendly and local rules. Any mishaps or damages caused by the traveler must be paid for by them."
    },
    {
      title: "Our Coverage",
      icon: <ShieldAlert className="text-orange-500" />,
      content: "We arrange trusted partners but are not liable for delays, weather-related changes, or extra costs. We provide alternatives where possible, but no refunds for factors beyond our control."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-[#4F46E5] pt-20 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white font-bold text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Book Smart, <span className="text-indigo-200">Travel Comfy!</span>
          </h1>
          <p className="text-indigo-100 text-lg font-medium opacity-90">
            By confirming your trip, you agree to these essential booking terms.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl p-6 md:p-12 border border-slate-100">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-8 mb-10">
            <div className="flex items-center gap-3 text-slate-400">
                <Clock size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">Last Updated: {lastUpdated}</span>
            </div>
            <Scale size={32} className="text-[#4F46E5] opacity-20" />
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {mainTerms.map((term, index) => (
              <div key={index} className="space-y-3 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
                    {React.cloneElement(term.icon, { size: 24, className: "group-hover:text-white transition-colors" })}
                  </div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">{term.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium pl-14">
                  {term.content}
                </p>
              </div>
            ))}
          </div>

          {/* --- EXTRA DETAILS SECTION --- */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bank Details Snippet */}
            <div className="lg:col-span-2 bg-indigo-50/50 rounded-[2.5rem] p-8 border border-indigo-100">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Landmark size={20} className="text-[#4F46E5]" /> Official Payment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-slate-700">
                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <p className="text-[10px] text-slate-400 uppercase mb-1">Account Holder</p>
                        VIJAY THAKUR
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <p className="text-[10px] text-slate-400 uppercase mb-1">Account Number</p>
                        1025104000052164
                    </div>
                </div>
            </div>

            {/* Photos & Legal */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6">
                <div className="space-y-2">
                    <h4 className="font-black flex items-center gap-2">
                        <Camera size={18} className="text-indigo-400" /> Our Snaps
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Trip photos may be used on our site/socials. To opt-out, simply email us.
                    </p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-black flex items-center gap-2">
                        <Scale size={18} className="text-indigo-400" /> Legal
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        All disputes are subject to Sundernagar courts jurisdiction.
                    </p>
                </div>
            </div>
          </div>

          {/* --- FOOTER CTA --- */}
          <div className="text-center mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
             <div className="flex items-center gap-4 text-slate-500 font-bold">
                <Phone size={20} className="text-[#4F46E5]" />
                <span>On-trip help? +91 80916-55570</span>
             </div>
             <div className="flex flex-wrap justify-center gap-4">
                <Link to="/privacy" className="text-sm font-bold text-[#4F46E5] hover:underline">Privacy Policy</Link>
                <Link to="/contact" className="text-sm font-bold text-slate-400 hover:text-slate-600">Contact Team</Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Required for the clock icon
import { Clock } from 'lucide-react';

export default TermsPage;