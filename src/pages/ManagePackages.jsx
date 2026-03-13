import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Clock, Tag, Plus, Trash2, Edit3, Loader2, X } from 'lucide-react';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null); // Edit track karne ke liye

  const [formData, setFormData] = useState({
    title: '', price: '', old_price: '', duration: '', from_location: '', to_location: '', category: 'Adventure'
  });

  const fetchPackages = async () => {
    setFetching(true);
    const { data, error } = await supabase.from('packages').select('*').order('id', { ascending: false });
    if (!error) setPackages(data || []);
    setFetching(false);
  };

  useEffect(() => { fetchPackages(); }, []);

  // --- EDIT MODE ON KARNA ---
  const startEdit = (pkg) => {
    setEditingId(pkg.id);
    setFormData({
      title: pkg.title,
      price: pkg.price,
      old_price: pkg.old_price || '',
      duration: pkg.duration,
      from_location: pkg.from_location,
      to_location: pkg.to_location,
      category: pkg.category
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form par focus le jana
  };

  // --- CANCEL EDIT ---
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', price: '', old_price: '', duration: '', from_location: '', to_location: '', category: 'Adventure' });
  };

  // --- SAVE YA UPDATE HANDLE KARNA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanData = {
      ...formData,
      price: Number(formData.price),
      old_price: formData.old_price ? Number(formData.old_price) : null
    };

    try {
      if (editingId) {
        // UPDATE LOGIC
        const { error } = await supabase.from('packages').update(cleanData).eq('id', editingId);
        if (error) throw error;
        alert("Package Updated!");
      } else {
        // INSERT LOGIC
        const { error } = await supabase.from('packages').insert([cleanData]);
        if (error) throw error;
        alert("Package Added!");
      }
      cancelEdit();
      fetchPackages();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id) => {
    if (window.confirm("Delete this package?")) {
      const { error } = await supabase.from('packages').delete().eq('id', id);
      if (!error) fetchPackages();
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Manage Tour Packages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- FORM SECTION --- */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className={`bg-white p-7 rounded-[2.5rem] shadow-sm border-2 ${editingId ? 'border-indigo-500' : 'border-transparent'} space-y-4 sticky top-8 transition-all`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
                  {editingId ? <Edit3 size={20} className="text-indigo-500" /> : <Plus size={20} className="text-indigo-500" />}
                  {editingId ? 'Edit Package' : 'New Package'}
                </h2>
                {editingId && (
                  <button onClick={cancelEdit} className="text-slate-400 hover:text-red-500"><X size={20} /></button>
                )}
              </div>

              <input type="text" placeholder="Package Title" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />

              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Price" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                <input type="number" placeholder="Old Price" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.old_price} onChange={(e) => setFormData({...formData, old_price: e.target.value})} />
              </div>

              <input type="text" placeholder="Duration (e.g. 3N/4D)" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />

              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="From" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.from_location} onChange={(e) => setFormData({...formData, from_location: e.target.value})} />
                <input type="text" placeholder="To" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.to_location} onChange={(e) => setFormData({...formData, to_location: e.target.value})} />
              </div>

              <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#4F46E5]" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Adventure">Adventure</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Family">Family</option>
                <option value="Spiritual">Spiritual</option>
              </select>

              <button type="submit" disabled={loading} className={`w-full ${editingId ? 'bg-indigo-600' : 'bg-slate-900'} text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 transition-all`}>
                {loading ? <Loader2 className="animate-spin" /> : (editingId ? "Update Package" : "Publish Package")}
              </button>
            </form>
          </div>

          {/* --- LIST SECTION --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Details</th>
                    <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {fetching ? (
                    <tr><td colSpan="2" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-slate-300" /></td></tr>
                  ) : packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-slate-50/80 transition-all">
                      <td className="p-5">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-bold text-slate-800 text-lg">{pkg.title}</p>
                            <p className="text-sm text-slate-500 font-medium">₹{pkg.price} | {pkg.duration}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold uppercase">{pkg.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => startEdit(pkg)} className="p-3 text-indigo-500 hover:bg-indigo-50 rounded-2xl transition-all">
                            <Edit3 size={20} />
                          </button>
                          <button onClick={() => deletePackage(pkg.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-2xl transition-all">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagePackages;