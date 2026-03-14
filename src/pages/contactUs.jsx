import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// Supabase Setup
const supabaseUrl = 'https://gcxwcbxsknxgknaiyfte.supabase.co';
const supabaseKey = 'sb_publishable_ZKxJZs8TX9n6O6K9GcGE1w_ZXqg8Ect'; 
const supabase = createClient(supabaseUrl, supabaseKey);

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- SABSE IMPORTANT CHANGE YAHAN HAI ---
    // Hum elements[0] use nahi karenge, sidha input type se value uthayenge
    const name = e.target.querySelector('input[placeholder*="Name"]').value;
    const phone = e.target.querySelector('input[type="tel"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;

    const formData = { name, phone, email, message };

    // Debugging ke liye (Browser Console mein check karne ke liye)
    console.log("Data being sent to EmailJS:", formData);

    try {
      // 1. Supabase mein Save karna
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (dbError) throw dbError;

      // 2. EmailJS - Variables: {{name}}, {{phone}}, {{email}}, {{message}}
      try {
        await emailjs.send(
          'service_oe227ev', 
          'template_kwl8qhl', 
          {
            name: name,      
            phone: phone,    // Dashboard variable {{phone}} se match karega
            email: email,    // Dashboard variable {{email}} se match karega
            message: message,
            title: "New Website Enquiry"
          },
          'gjsOWhdEdkUa0cThx'
        );
      } catch (emailError) {
        console.warn("EmailJS failed but Supabase saved data.");
      }

      // Success UI
      setIsSent(true);
      e.target.reset(); // Form clear karna
      setTimeout(() => setIsSent(false), 5000);

    } catch (error) {
      console.error("Database Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-[#4F46E5] pt-20 pb-32 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Get in <span className="text-indigo-200">Touch</span>
          </h1>
          <p className="text-indigo-100 text-lg font-medium opacity-90">
            Have a question or ready to plan your next adventure? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          
          {/* LEFT: Contact Info */}
          <div className="lg:w-2/5 bg-slate-900 p-10 lg:p-16 text-white space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl font-black">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                    <a href="tel:8091655570" className="text-lg font-bold hover:text-indigo-400 transition-colors">+91 80916-55570</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                    <a href="mailto:tripcomfortholidays@gmail.com" className="text-lg font-bold hover:text-indigo-400 transition-colors break-all">tripcomfortholidays@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Office Address</p>
                    <p className="text-slate-300 font-medium leading-relaxed">203/5 Bharoh, Sundernagar, Mandi, HP 175018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:w-3/5 p-10 lg:p-16">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><CheckCircle2 size={48} /></div>
                <h2 className="text-3xl font-black text-slate-900">Message Sent!</h2>
                <button onClick={() => setIsSent(false)} className="text-[#4F46E5] font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input required type="text" placeholder="Enter Your Name" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <input required type="tel" placeholder="+91 00000-00000" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input required type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Tell us about your trip</label>
                  <textarea required rows="4" placeholder="Destination, group size..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#4F46E5] outline-none transition-all font-medium resize-none"></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-[#4F46E5] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition shadow-xl disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : <><Send size={20} /> Send Message</>}
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