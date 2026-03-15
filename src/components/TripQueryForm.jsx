import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Send, Calendar, Users, MapPin, Clock, Hotel, User, Mail, Globe, PlaneTakeoff, CheckCircle } from 'lucide-react';

const TripQueryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city_country: '',
    pickup_location: '',
    drop_location: '',
    destination: '',
    travel_date: '',
    duration: '',
    persons: '',
    trip_type: 'Family',
    hotel_category: 'Standard',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // New state for professional feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('trip_queries') 
        .insert([formData]);

      if (error) throw error;

      setSubmitted(true); // Show success UI instead of alert
      setFormData({
        name: '', email: '', phone: '', city_country: '',
        pickup_location: '', drop_location: '', destination: '',
        travel_date: '', duration: '', persons: '',
        trip_type: 'Family', hotel_category: 'Standard'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);

    } catch (error) {
      console.error("Error:", error.message);
      alert("Submission Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-10 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 text-center animate-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-5 rounded-full text-emerald-600">
            <CheckCircle size={60} />
          </div>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Inquiry Received!</h2>
        <p className="text-slate-500 font-medium mt-4 text-lg">
          Thank you for choosing us. Your trip details have been successfully submitted. 
          Our travel experts will contact you shortly to plan your perfect itinerary.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-indigo-600 font-bold hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 md:p-10 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
      <div className="text-center mb-10">
        <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Plan Your Journey</span>
        <h2 className="text-4xl font-black text-slate-900 mt-4 tracking-tight">Trip Inquiry Form</h2>
        <p className="text-slate-500 font-medium mt-2">Provide your travel details and we will craft the best itinerary for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Personal & Contact Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><User size={16} className="text-indigo-500"/> Full Name</label>
            <input required type="text" placeholder="Enter your full name" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail size={16} className="text-indigo-500"/> Email Address</label>
            <input required type="email" placeholder="example@mail.com" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock size={16} className="text-indigo-500"/> Phone (WhatsApp)</label>
            <input required type="tel" placeholder="+91 00000-00000" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>

        {/* --- Location Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[2rem]">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Globe size={16} className="text-indigo-500"/> Your City/Country</label>
            <input required type="text" placeholder="e.g. London, UK or Delhi, India" className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.city_country} onChange={(e) => setFormData({...formData, city_country: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><PlaneTakeoff size={16} className="text-indigo-500"/> Destination</label>
            <input required type="text" placeholder="e.g. Manali or Spiti Valley" className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin size={16} className="text-green-500"/> Pickup Location</label>
            <input required type="text" placeholder="Airport or Station name" className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.pickup_location} onChange={(e) => setFormData({...formData, pickup_location: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin size={16} className="text-red-500"/> Drop Location</label>
            <input required type="text" placeholder="Return point details" className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.drop_location} onChange={(e) => setFormData({...formData, drop_location: e.target.value})} />
          </div>
        </div>

        {/* --- Trip Specifics --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Calendar size={16} className="text-indigo-500"/> Travel Date</label>
            <input required type="date" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.travel_date} onChange={(e) => setFormData({...formData, travel_date: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock size={16} className="text-indigo-500"/> Duration (Days)</label>
            <input required type="number" placeholder="5" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Users size={16} className="text-indigo-500"/> No. of Persons</label>
            <input required type="number" placeholder="2" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.persons} onChange={(e) => setFormData({...formData, persons: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Hotel size={16} className="text-indigo-500"/> Hotel Category</label>
            <select className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.hotel_category} onChange={(e) => setFormData({...formData, hotel_category: e.target.value})}>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Trip Type */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Trip Type</label>
          <div className="flex flex-wrap gap-4">
            {['Family', 'Honeymoon', 'Adventure', 'Friends', 'Corporate'].map((type) => (
              <label key={type} className={`px-6 py-2 rounded-full border cursor-pointer transition-all font-bold text-sm ${formData.trip_type === type ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}>
                <input type="radio" name="trip_type" className="hidden" value={type} checked={formData.trip_type === type} onChange={(e) => setFormData({...formData, trip_type: e.target.value})} />
                {type}
              </label>
            ))}
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70">
          {loading ? "Processing..." : <>Send My Inquiry <Send size={22}/></>}
        </button>
      </form>
    </div>
  );
};

export default TripQueryForm;