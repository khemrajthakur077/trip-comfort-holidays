import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Tag, Plus, Trash2, Loader2, Megaphone, AlertTriangle, Edit3, X, Save, Ticket, Calendar } from 'lucide-react';

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [dbError, setDbError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const [formData, setFormData] = useState({ 
    title: '', 
    discount: '', 
    description: '',
    coupon_code: '',
    expiry_date: ''
  });

  const fetchOffers = async () => {
    setFetching(true);
    setDbError(null);
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (err) {
      setDbError(err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('offers').insert([formData]);
      if (error) throw error;
      alert("Offer published!");
      setFormData({ title: '', discount: '', description: '', coupon_code: '', expiry_date: '' });
      fetchOffers();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOffer = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const { error } = await supabase.from('offers').delete().eq('id', id);
        if (error) throw error;
        setOffers(offers.filter(o => o.id !== id));
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  const openEditModal = (offer) => {
    setEditingOffer({ ...offer });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('offers')
        .update({
          title: editingOffer.title,
          discount: editingOffer.discount,
          description: editingOffer.description,
          coupon_code: editingOffer.coupon_code,
          expiry_date: editingOffer.expiry_date
        })
        .eq('id', editingOffer.id);

      if (error) throw error;
      alert("Offer updated!");
      setIsEditModalOpen(false);
      fetchOffers();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Megaphone className="text-emerald-500" /> Offers Admin Panel
          </h1>
          {dbError && <span className="text-red-500 font-bold flex items-center gap-1 text-sm"><AlertTriangle size={16}/> DB Error</span>}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4 sticky top-8">
              <h2 className="text-xl font-bold text-slate-700">Add New Offer</h2>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" placeholder="COUPON" className="p-3 bg-slate-50 border rounded-xl font-mono text-sm"
                  value={formData.coupon_code} onChange={(e) => setFormData({...formData, coupon_code: e.target.value.toUpperCase()})} 
                />
                <input 
                  type="date" className="p-3 bg-slate-50 border rounded-xl text-xs"
                  value={formData.expiry_date} onChange={(e) => setFormData({...formData, expiry_date: e.target.value})} 
                />
              </div>
              <input 
                type="text" placeholder="Title" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required 
              />
              <input 
                type="text" placeholder="Discount (e.g. 30% OFF)" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none"
                value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} required 
              />
              <textarea 
                placeholder="Details" className="w-full p-4 bg-slate-50 border rounded-2xl h-24 outline-none"
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <button disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:opacity-90">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Publish"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden divide-y">
              {fetching ? <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-slate-200" size={40} /></div> :
              offers.map((offer) => (
                <div key={offer.id} className="p-6 flex justify-between items-center hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><Tag /></div>
                    <div>
                      <h3 className="font-bold text-slate-800">{offer.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs font-bold text-emerald-600">{offer.discount}</span>
                        {offer.coupon_code && <span className="text-[10px] bg-slate-100 px-1.5 rounded font-mono">CODE: {offer.coupon_code}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(offer)} className="p-2 text-slate-400 hover:text-blue-500"><Edit3 size={18} /></button>
                    <button onClick={() => deleteOffer(offer.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Edit</h2>
              <button onClick={() => setIsEditModalOpen(false)}><X /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input 
                className="p-3 bg-slate-50 border rounded-xl font-mono" value={editingOffer.coupon_code || ''}
                onChange={(e) => setEditingOffer({...editingOffer, coupon_code: e.target.value.toUpperCase()})}
              />
              <input 
                type="date" className="p-3 bg-slate-50 border rounded-xl" value={editingOffer.expiry_date || ''}
                onChange={(e) => setEditingOffer({...editingOffer, expiry_date: e.target.value})}
              />
            </div>
            <input 
              className="w-full p-4 bg-slate-50 border rounded-2xl" value={editingOffer.title}
              onChange={(e) => setEditingOffer({...editingOffer, title: e.target.value})}
            />
            <input 
              className="w-full p-4 bg-slate-50 border rounded-2xl" value={editingOffer.discount}
              onChange={(e) => setEditingOffer({...editingOffer, discount: e.target.value})}
            />
            <textarea 
              className="w-full p-4 bg-slate-50 border rounded-2xl h-24" value={editingOffer.description}
              onChange={(e) => setEditingOffer({...editingOffer, description: e.target.value})}
            />
            <button onClick={handleUpdate} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black">Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOffers;