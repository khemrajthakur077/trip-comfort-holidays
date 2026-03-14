import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// Supabase Setup
const supabase = createClient('https://gcxwcbxsknxgknaiyfte.supabase.co', 'sb_publishable_ZKxJZs8TX9n6O6K9GcGE1w_ZXqg8Ect');

const ContactPage = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Form Data nikalna
    const formData = {
      name: formRef.current.user_name.value,
      phone: formRef.current.user_phone.value,
      email: formRef.current.user_email.value,
      message: formRef.current.user_message.value,
    };

    try {
      // 2. Supabase mein Save karna (Dashboard ke liye)
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (dbError) throw dbError;

      // 3. Email bhejna (Apko notification milne ke liye)
      // Note: emailjs.sendForm use kar rahe hain taaki template ke placeholders match ho sakein
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        formRef.current, 
        'YOUR_PUBLIC_KEY'
      );

      setIsSent(true);
      formRef.current.reset();
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("Error:", error);
      alert("Kuch galat hua, dobara koshish karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* ... Hero Section Same Rahega ... */}
      
      <div className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT side (Contact Info) - Same as before */}
          <div className="lg:w-2/5 bg-slate-900 p-10 lg:p-16 text-white space-y-12">
             {/* ... (Previous code for Phone/Mail/Address) ... */}
          </div>

          {/* RIGHT SIDE: Contact Form */}
          <div className="lg:w-3/5 p-10 lg:p-16">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <CheckCircle2 size={48} className="text-green-500" />
                <h2 className="text-3xl font-black">Details Saved & Email Sent!</h2>
                <button onClick={() => setIsSent(false)} className="text-[#4F46E5] font-bold underline">Send another</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input name="user_name" required type="text" placeholder="Raj Thakur" className="w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input name="user_phone" required type="tel" placeholder="+91 80916-XXXXX" className="w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input name="user_email" required type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tell us about your trip</label>
                  <textarea name="user_message" required rows="4" placeholder="Destination, group size..." className="w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all resize-none"></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-[#4F46E5] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 disabled:opacity-70 transition-all"
                >
                  {isSubmitting ? "Sending Details..." : <><Send size={20} /> Submit Inquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;