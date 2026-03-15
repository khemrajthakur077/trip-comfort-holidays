import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; 

// Saare icons jo niche use ho rahe hain unhe yahan safely import kiya hai
import { 
  MapPin, 
  Loader2, 
  Camera, 
  Video, 
  User, 
  MessageSquare, 
  Send 
} from 'lucide-react';

const AddGuestReview = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guest_name: '',
    location: '',
    tag: 'Honeymoon',
    review_text: '',
    media_url: '',
    media_type: 'image'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Yahan se 'data' hata diya hai taaki VS Code red line na dikhaye
      const { error } = await supabase
        .from('guest_gallery') 
        .insert([formData]);

      if (error) throw error;

      alert("Success! Memory added to Gallery.");
      
      // Form Reset
      setFormData({
        guest_name: '',
        location: '',
        tag: 'Honeymoon',
        review_text: '',
        media_url: '',
        media_type: 'image'
      });
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Add Guest <span className="text-indigo-600">Memory</span></h1>
          <p className="text-slate-500 font-medium italic">Publish traveler stories directly to your website.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-slate-100 transition-all hover:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Guest Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 px-1">
                <User size={16} className="text-indigo-500" /> Guest Name
              </label>
              <input 
                required
                type="text" 
                placeholder="Ex: Amit & Suman"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                value={formData.guest_name}
                onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 px-1">
                <MapPin size={16} className="text-indigo-500" /> Location
              </label>
              <input 
                required
                type="text" 
                placeholder="Ex: Shimla, HP"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            {/* Media URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 px-1">
                <Camera size={16} className="text-indigo-500" /> Media URL (Direct Link)
              </label>
              <input 
                required
                type="url" 
                placeholder="Paste Supabase or Cloudinary URL"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                value={formData.media_url}
                onChange={(e) => setFormData({...formData, media_url: e.target.value})}
              />
            </div>

            {/* Media Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 px-1">Format</label>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, media_type: 'image'})}
                  className={`flex-1 py-4 rounded-2xl border flex items-center justify-center gap-2 font-black transition-all ${formData.media_type === 'image' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
                >
                  <Camera size={18} /> Image
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, media_type: 'video'})}
                  className={`flex-1 py-4 rounded-2xl border flex items-center justify-center gap-2 font-black transition-all ${formData.media_type === 'video' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'}`}
                >
                  <Video size={18} /> Video
                </button>
              </div>
            </div>

            {/* Tag Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 px-1">Trip Category</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black text-slate-700 appearance-none"
                value={formData.tag}
                onChange={(e) => setFormData({...formData, tag: e.target.value})}
              >
                <option value="Honeymoon">Honeymoon</option>
                <option value="Adventure">Adventure</option>
                <option value="International">International</option>
                <option value="Family">Family</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* Review Text */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 px-1">
                <MessageSquare size={16} className="text-indigo-500" /> Review
              </label>
              <textarea 
                required
                rows="4"
                placeholder="Write what the guest said..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                value={formData.review_text}
                onChange={(e) => setFormData({...formData, review_text: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            type="submit"
            className="w-full mt-10 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={22} />}
            {loading ? 'Adding...' : 'Post to Gallery'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGuestReview;