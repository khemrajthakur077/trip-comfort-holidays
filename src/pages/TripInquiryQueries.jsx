import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Mail, Phone, Trash2, MessageCircle, Calendar,
  MessageSquare, PlaneTakeoff, Loader2, User, MapPin, Hotel, Globe, 
  Clock, Users, Navigation
} from 'lucide-react';

const TripInquiryQueries = () => {
  const [activeTab, setActiveTab] = useState('trip'); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setData([]); 
      
      const tableName = activeTab === 'trip' ? 'trip_queries' : 'inquiries';
      
      const { data: result, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(result || []);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const tableName = activeTab === 'trip' ? 'trip_queries' : 'inquiries';
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (!error) setData(data.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Inquiry Management</h1>
            <p className="text-slate-500 font-medium mt-1">
              Currently viewing: <span className="text-indigo-600 font-bold underline uppercase">{activeTab === 'trip' ? 'Trip Requests' : 'Contact Messages'}</span>
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-200 p-1.5 rounded-2xl shadow-inner border border-slate-300">
            <button 
              onClick={() => setActiveTab('trip')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'trip' ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-500'}`}
            >
              <PlaneTakeoff size={20}/> Trip Requests
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'contact' ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-500'}`}
            >
              <MessageSquare size={20}/> Messages
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={48}/>
            <p className="text-slate-500 font-black tracking-widest uppercase">Loading {activeTab} data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8" key={activeTab}>
            {data.length > 0 ? data.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 animate-in fade-in duration-500 hover:shadow-xl transition-shadow">
                
                {/* --- FULL TRIP DATA LAYOUT --- */}
                {activeTab === 'trip' && (
                  <div className="flex flex-col gap-8">
                    {/* Top Row: User Primary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Customer</label>
                        <h3 className="text-2xl font-black text-slate-900">{item.name}</h3>
                        <p className="flex items-center gap-2 text-slate-500 font-medium"><Globe size={14}/> {item.city_country}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Contact Information</label>
                        <p className="flex items-center gap-2 text-slate-700 font-bold"><Phone size={16} className="text-slate-400"/> {item.phone}</p>
                        <p className="flex items-center gap-2 text-slate-700 font-bold"><Mail size={16} className="text-slate-400"/> {item.email}</p>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                         <a href={`https://wa.me/${item.phone?.replace(/\D/g, '')}`} target="_blank" className="bg-green-500 text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
                           <MessageCircle size={18}/> WHATSAPP
                         </a>
                         <button onClick={() => deleteItem(item.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors">
                            <Trash2 size={22}/>
                         </button>
                      </div>
                    </div>

                    {/* Middle Row: Destinations & Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-indigo-500">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Destination</label>
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600"><Navigation size={18}/></div>
                           <span className="text-lg font-black text-slate-800">{item.destination}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-2xl">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Pickup & Drop</label>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin size={14} className="text-green-500"/> From: {item.pickup_location}</p>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2 mt-1"><MapPin size={14} className="text-red-500"/> To: {item.drop_location}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-2xl text-center">
                           <Clock size={20} className="mx-auto text-indigo-600 mb-1"/>
                           <p className="text-[10px] font-bold text-indigo-400 uppercase">Duration</p>
                           <p className="text-lg font-black text-indigo-900">{item.duration} Days</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-2xl text-center">
                           <Users size={20} className="mx-auto text-emerald-600 mb-1"/>
                           <p className="text-[10px] font-bold text-emerald-400 uppercase">Persons</p>
                           <p className="text-lg font-black text-emerald-900">{item.persons}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Date & Preferences */}
                    <div className="flex flex-wrap gap-4 items-center justify-between pt-4">
                       <div className="flex gap-4">
                         <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                           <Calendar size={14}/> Travel Date: {item.travel_date}
                         </span>
                         <span className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-xs font-bold text-amber-700">
                           <Hotel size={14}/> {item.hotel_category} Hotel
                         </span>
                         <span className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-xs font-bold text-purple-700">
                           <PlaneTakeoff size={14}/> {item.trip_type} Trip
                         </span>
                       </div>
                       <p className="text-[10px] text-slate-400 font-bold italic">Received on: {new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                {/* --- CONTACT LAYOUT --- */}
                {activeTab === 'contact' && (
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white"><User size={20}/></div>
                        <h3 className="text-xl font-black text-slate-900">{item.name} <span className="text-sm text-slate-400 font-medium ml-2">({item.email})</span></h3>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-indigo-500 italic text-slate-700 font-medium text-lg">
                        "{item.message || "No message content provided."}"
                      </div>
                      <div className="flex gap-4 mt-4">
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Phone: {item.phone}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Date: {new Date(item.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteItem(item.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <Trash2 size={24}/>
                    </button>
                  </div>
                )}
              </div>
            )) : (
              <div className="bg-white p-32 rounded-[3rem] text-center border-4 border-dashed border-slate-100">
                <p className="text-slate-300 font-black text-2xl uppercase tracking-widest">No inquiries found in this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripInquiryQueries;