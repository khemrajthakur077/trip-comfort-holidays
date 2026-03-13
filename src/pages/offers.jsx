import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Ticket, Clock, Copy, CheckCircle2, Loader2, Gift } from 'lucide-react';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => { fetchOffers(); }, []);

  async function fetchOffers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (code, id) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-[#4F46E5] pt-20 pb-32 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white">Special <span className="text-yellow-300">Offers</span></h1>
        <p className="text-indigo-100 mt-4">Save more on your next trip with Trip Comfort Holidays.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16">
        {loading ? (
          <div className="flex flex-col items-center py-20"><Loader2 className="animate-spin text-[#4F46E5]" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.length > 0 ? offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border flex flex-col md:flex-row group transition-all hover:-translate-y-1">
                <div className="bg-slate-900 md:w-40 flex flex-col items-center justify-center p-8 text-center text-white">
                  <Gift className="text-yellow-400 mb-2" size={32} />
                  <span className="text-3xl font-black">{offer.discount}</span>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Off</p>
                </div>

                <div className="p-8 flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">{offer.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{offer.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {offer.expiry_date && (
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-50 px-3 py-1 rounded-full">
                        <Clock size={14} /> Exp: {offer.expiry_date}
                      </div>
                    )}
                  </div>

                  {offer.coupon_code && (
                    <div className="flex items-center gap-2 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl px-6 py-3 justify-between">
                      <span className="font-black text-indigo-600 tracking-widest uppercase">{offer.coupon_code}</span>
                      <button onClick={() => copyToClipboard(offer.coupon_code, offer.id)} className="text-indigo-400 hover:text-indigo-600">
                        {copiedId === offer.id ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )) : <p className="text-center col-span-full py-20 text-slate-400 font-bold">No active offers.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;