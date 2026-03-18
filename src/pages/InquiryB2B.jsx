import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { Mail, Phone, MapPin, MessageCircle, Trash2, User, AlertCircle } from 'lucide-react';

const B2BRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('b2b_partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setRequests(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Database Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this request?")) {
      try {
        const { error: delError } = await supabase
          .from('b2b_partners')
          .delete()
          .eq('id', id);
          
        if (delError) throw delError;
        setRequests(requests.filter(req => req.id !== id));
      } catch (err) {
        alert("Deletion failed: " + err.message);
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4F46E5]"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white border border-red-100 p-8 rounded-[2.5rem] shadow-xl text-center max-w-md">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-black text-slate-900 mb-2">Connection Error</h2>
        <p className="text-slate-500 mb-6 font-medium">{error}</p>
        <button onClick={fetchRequests} className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">B2B Partner Requests</h1>
            <p className="text-slate-500 font-medium tracking-tight text-sm">Review applications from travel agents and partners.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Partners: </span>
            <span className="text-xl font-black text-[#4F46E5]">{requests.length}</span>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em]">Agency & Owner</th>
                  <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em]">Contact Information</th>
                  <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em]">Location</th>
                  <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 text-[#4F46E5] rounded-xl flex items-center justify-center shrink-0">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm">{req.agency_name}</p>
                            <p className="text-xs text-slate-500 font-medium">{req.owner_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1.5">
                          <a href={`mailto:${req.email}`} className="text-xs flex items-center gap-2 text-slate-600 hover:text-[#4F46E5] font-medium">
                            <Mail size={12} /> {req.email}
                          </a>
                          <a href={`tel:${req.phone}`} className="text-xs flex items-center gap-2 text-slate-600 hover:text-[#4F46E5] font-bold">
                            <Phone size={12} /> {req.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                          <MapPin size={12} className="text-red-400" /> {req.location}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <a 
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            title="WhatsApp Chat"
                          >
                            <MessageCircle size={18} />
                          </a>
                          <button 
                            onClick={() => deleteRequest(req.id)}
                            className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-24">
                      <p className="text-slate-300 font-black uppercase tracking-widest text-sm italic">No partner requests available at the moment</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BRequests;