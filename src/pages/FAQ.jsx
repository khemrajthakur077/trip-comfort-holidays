import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Globe, ShieldCheck } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Booking & Payments",
      icon: <Globe size={20} className="text-[#4F46E5]" />,
      questions: [
        {
          q: "How do I book a tour with Trip Comfort Holidays?",
          a: "You can book directly through our website by clicking the 'Get Quote' button on any package, or contact us via WhatsApp/Phone for a customized itinerary."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major UPI apps (Google Pay, PhonePe), Bank Transfers, and Credit/Debit cards through our secure payment gateway."
        }
      ]
    },
    {
      category: "Cancellations & Refunds",
      icon: <ShieldCheck size={20} className="text-[#4F46E5]" />,
      questions: [
        {
          q: "What is your refund policy?",
          a: "Refunds depend on the timing of cancellation. Generally, cancellations made 30 days before the trip are eligible for a 75% refund. Please check our Terms & Conditions for detailed slabs."
        },
        {
          q: "Can I reschedule my trip?",
          a: "Yes, rescheduling is possible subject to availability and hotel policies. Additional charges may apply depending on the season."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HERO SECTION (Spacing Fixed) --- */}
      <div className="bg-[#4F46E5] text-white pt-24 pb-40 md:pt-32 md:pb-52 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-white/10">
            Help Center
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            How can we <span className="text-indigo-200">help you?</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl font-medium opacity-90 max-w-xl mx-auto">
            Find answers to common questions about our tours, bookings, and policies.
          </p>
        </div>
      </div>

      {/* --- FAQ SECTION (Gap Added with margin) --- */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
        <div className="space-y-16"> {/* Categories ke beech gap badhaya gaya hai */}
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-6">
              {/* Category Header with extra margin-bottom */}
              <div className="flex items-center gap-4 px-2 mb-2">
                <div className="p-3 bg-white shadow-md rounded-2xl text-[#4F46E5]">
                  {group.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-widest">
                  {group.category}
                </h2>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {group.questions.map((faq, faqIdx) => {
                  const itemIndex = `${groupIdx}-${faqIdx}`;
                  const isOpen = openIndex === itemIndex;
                  return (
                    <div 
                      key={itemIndex} 
                      className={`bg-white rounded-[2rem] border transition-all duration-300 ${
                        isOpen 
                        ? 'border-[#4F46E5] shadow-2xl shadow-indigo-100' 
                        : 'border-slate-100 shadow-sm hover:border-indigo-200'
                      }`}
                    >
                      <button 
                        onClick={() => toggleFAQ(itemIndex)}
                        className="w-full flex items-center justify-between p-7 md:p-8 text-left outline-none"
                      >
                        <span className={`text-base md:text-lg font-bold transition-colors ${
                          isOpen ? 'text-[#4F46E5]' : 'text-slate-800'
                        }`}>
                          {faq.q}
                        </span>
                        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-indigo-50 rotate-180' : 'bg-slate-50'}`}>
                          {isOpen ? <ChevronUp size={20} className="text-[#4F46E5]" /> : <ChevronDown size={20} className="text-slate-400" />}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-7 md:px-8 pb-8 text-slate-500 leading-relaxed font-medium border-t border-slate-50 pt-4 animate-in fade-in slide-in-from-top-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* --- CONTACT SUPPORT --- */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-4xl font-black text-white">Still have questions?</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Our support team is ready to help you plan your dream holiday in Himachal.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/918091655570" className="flex items-center gap-3 bg-[#4F46E5] text-white px-10 py-4.5 rounded-2xl font-black hover:bg-indigo-600 transition w-full sm:w-auto justify-center">
                <MessageCircle size={22} /> WhatsApp
              </a>
              <a href="tel:8091655570" className="flex items-center gap-3 bg-white text-slate-900 px-10 py-4.5 rounded-2xl font-black hover:bg-slate-50 transition w-full sm:w-auto justify-center">
                <Phone size={22} /> Call Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;