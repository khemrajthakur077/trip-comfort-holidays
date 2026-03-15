import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Trash2, Edit3, Loader2, X, Calendar, CheckCircle2, XCircle, Image as ImageIcon, MapPin, Clock, Hotel, Utensils } from 'lucide-react';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: '', subtitle: '', destination: '', price: '', old_price: '', 
    duration: '', from_location: '', to_location: '', category: '',
    hotel: '', meal: '', image_url: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [itinerary, setItinerary] = useState([{ day: 1, title: '', desc: '' }]);
  const [inclusions, setInclusions] = useState(['']);
  const [exclusions, setExclusions] = useState(['']);

  const fetchPackages = async () => {
    setFetching(true);
    const { data, error } = await supabase.from('packages').select('*').order('id', { ascending: false });
    if (!error) setPackages(data || []);
    setFetching(false);
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleAddRow = (setter, state) => setter([...state, '']);
  const handleUpdateRow = (setter, state, index, val) => {
    const updated = [...state];
    updated[index] = val;
    setter(updated);
  };
  const handleRemoveRow = (setter, state, index) => {
    if (state.length > 1) {
      setter(state.filter((_, i) => i !== index));
    } else {
      setter(['']); // Kam se kam ek khali row rakhein
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const { error } = await supabase.from('packages').delete().eq('id', id);
      if (error) throw error;
      setPackages(packages.filter(p => p.id !== id));
      alert("Package deleted successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // FIXED: startEdit function ab data ko sahi se parse karega
  const startEdit = (pkg) => {
    if (!pkg) return;
    setEditingId(pkg.id);
    
    setFormData({
      title: pkg.title || '',
      subtitle: pkg.subtitle || '',
      destination: pkg.destination || '',
      price: pkg.price || '',
      old_price: pkg.old_price || '',
      duration: pkg.duration || '',
      from_location: pkg.from_location || '',
      to_location: pkg.to_location || '',
      category: pkg.category || '',
      hotel: pkg.hotel || '',
      meal: pkg.meal || '',
      image_url: pkg.image_url || ''
    });

    // Itinerary Fix
    setItinerary(Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 
      ? pkg.itinerary 
      : [{ day: 1, title: '', desc: '' }]);

    // Inclusions Fix: Agar data string hai toh use array mein convert karega
    let inc = pkg.inclusions;
    if (typeof inc === 'string') {
        try { inc = JSON.parse(inc); } catch { inc = [inc]; }
    }
    setInclusions(Array.isArray(inc) && inc.length > 0 ? inc : ['']);

    // Exclusions Fix
    let exc = pkg.exclusions;
    if (typeof exc === 'string') {
        try { exc = JSON.parse(exc); } catch { exc = [exc]; }
    }
    setExclusions(Array.isArray(exc) && exc.length > 0 ? exc : ['']);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(initialForm);
    setItinerary([{ day: 1, title: '', desc: '' }]);
    setInclusions(['']);
    setExclusions(['']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty rows before saving
    const finalInclusions = inclusions.filter(i => i && i.trim() !== '');
    const finalExclusions = exclusions.filter(e => e && e.trim() !== '');
    const finalItinerary = itinerary.filter(it => it.title.trim() !== '' || it.desc.trim() !== '');

    const cleanData = {
      ...formData,
      price: Number(formData.price),
      old_price: formData.old_price ? Number(formData.old_price) : null,
      itinerary: finalItinerary,
      inclusions: finalInclusions,
      exclusions: finalExclusions
    };

    try {
      const { error } = editingId 
        ? await supabase.from('packages').update(cleanData).eq('id', editingId)
        : await supabase.from('packages').insert([cleanData]);

      if (error) throw error;
      alert(editingId ? "Package Updated Successfully!" : "Package Published Successfully!");
      resetForm();
      fetchPackages();
    } catch (err) {
      alert("Database Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Manage Tour Packages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6 sticky top-8 max-h-[90vh] overflow-y-auto pb-10">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                  {editingId ? <Edit3 size={22} /> : <Plus size={22} />} {editingId ? 'Edit Package' : 'Add New Package'}
                </h2>
                {editingId && <button type="button" onClick={resetForm} className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-red-500"><X size={20}/></button>}
              </div>

              {/* 1. Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">1. Basic Information</h3>
                <input type="text" placeholder="Package Title" className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-indigo-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                <input type="text" placeholder="Subtitle" className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-indigo-500" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Category</label>
                    <input type="text" placeholder="e.g. Adventure" className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-indigo-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Destination</label>
                    <input type="text" placeholder="City/Country" className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-indigo-500" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* 2. Logistics */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">2. Logistics & Details</h3>
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <Clock size={16} className="text-indigo-500" />
                        <input type="text" placeholder="Duration" className="bg-transparent w-full text-sm outline-none" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <MapPin size={16} className="text-green-500" />
                        <input type="text" placeholder="From" className="bg-transparent w-full text-sm outline-none" value={formData.from_location} onChange={e => setFormData({...formData, from_location: e.target.value})} />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <MapPin size={16} className="text-red-500" />
                        <input type="text" placeholder="To" className="bg-transparent w-full text-sm outline-none" value={formData.to_location} onChange={e => setFormData({...formData, to_location: e.target.value})} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Hotel size={18} className="text-orange-500" />
                        <input type="text" placeholder="Hotel" className="bg-transparent w-full text-sm outline-none" value={formData.hotel} onChange={e => setFormData({...formData, hotel: e.target.value})} />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Utensils size={18} className="text-blue-500" />
                        <input type="text" placeholder="Meal Plan" className="bg-transparent w-full text-sm outline-none" value={formData.meal} onChange={e => setFormData({...formData, meal: e.target.value})} />
                    </div>
                </div>
              </div>

              {/* 3. Pricing */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">3. Pricing & Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-indigo-600 ml-1">Current Price (₹)</label>
                    <input type="number" className="w-full p-3 bg-indigo-50/50 rounded-xl outline-none font-bold text-indigo-700" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Old Price</label>
                    <input type="number" className="w-full p-3 bg-slate-50 rounded-xl outline-none text-slate-400" value={formData.old_price} onChange={e => setFormData({...formData, old_price: e.target.value})} />
                  </div>
                </div>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input type="text" placeholder="Image URL" className="w-full p-3 pl-10 bg-slate-50 rounded-xl outline-none border border-slate-100" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                </div>
              </div>

              {/* 4. Sections */}
              <SectionWrapper title="Itinerary" icon={<Calendar size={16}/>} onAdd={() => setItinerary([...itinerary, { day: itinerary.length + 1, title: '', desc: '' }])}>
                {itinerary.map((day, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100 relative group">
                    <button type="button" onClick={() => handleRemoveRow(setItinerary, itinerary, i)} className="absolute right-3 top-3 text-slate-300 hover:text-red-500 transition-colors"><X size={16}/></button>
                    <span className="text-[10px] font-black text-indigo-400 uppercase">Day {i + 1}</span>
                    <input type="text" placeholder="Title for the day" className="w-full p-2 text-sm rounded-lg border-none" value={day.title} onChange={e => { const upd = [...itinerary]; upd[i].title = e.target.value; setItinerary(upd); }} />
                    <textarea placeholder="Description..." className="w-full p-2 text-sm rounded-lg border-none h-20 resize-none" value={day.desc} onChange={e => { const upd = [...itinerary]; upd[i].desc = e.target.value; setItinerary(upd); }} />
                  </div>
                ))}
              </SectionWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionWrapper title="Inclusions" icon={<CheckCircle2 size={16} className="text-green-500"/>} onAdd={() => handleAddRow(setInclusions, inclusions)}>
                  {inclusions.map((item, i) => (
                      <div key={i} className="flex gap-2">
                          <input type="text" placeholder="Included" className="flex-1 p-2 text-xs bg-slate-50 rounded-lg outline-none" value={item} onChange={e => handleUpdateRow(setInclusions, inclusions, i, e.target.value)} />
                          <button type="button" onClick={() => handleRemoveRow(setInclusions, inclusions, i)} className="text-red-300"><X size={14}/></button>
                      </div>
                  ))}
                </SectionWrapper>

                <SectionWrapper title="Exclusions" icon={<XCircle size={16} className="text-red-500"/>} onAdd={() => handleAddRow(setExclusions, exclusions)}>
                  {exclusions.map((item, i) => (
                      <div key={i} className="flex gap-2">
                          <input type="text" placeholder="Excluded" className="flex-1 p-2 text-xs bg-slate-50 rounded-lg outline-none" value={item} onChange={e => handleUpdateRow(setExclusions, exclusions, i, e.target.value)} />
                          <button type="button" onClick={() => handleRemoveRow(setExclusions, exclusions, i)} className="text-red-300"><X size={14}/></button>
                      </div>
                  ))}
                </SectionWrapper>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : (editingId ? "Save All Changes" : "Publish This Package")}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden sticky top-8">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-black text-slate-700 uppercase text-sm tracking-widest">Active Packages ({packages.length})</h3>
                    {fetching && <Loader2 className="animate-spin text-indigo-500" size={20}/>}
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-slate-50">
                            {packages.map(pkg => (
                                <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-5 flex items-center gap-4">
                                        <img src={pkg.image_url || 'https://via.placeholder.com/150'} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-slate-200" />
                                        <div className="flex-1">
                                            <p className="font-black text-slate-800 line-clamp-1">{pkg.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full uppercase">{pkg.category}</span>
                                                <p className="text-xs font-bold text-emerald-600">₹{pkg.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => startEdit(pkg)} className="p-3 text-indigo-500 hover:bg-indigo-50 rounded-2xl"><Edit3 size={20}/></button>
                                            <button onClick={() => handleDelete(pkg.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-2xl"><Trash2 size={20}/></button>
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
    </div>
  );
};

const SectionWrapper = ({ title, icon, onAdd, children }) => (
  <div className="space-y-3 pt-6 border-t border-slate-100">
    <div className="flex justify-between items-center">
      <label className="font-black text-slate-400 text-[10px] uppercase tracking-widest flex items-center gap-2">{icon} {title}</label>
      <button type="button" onClick={onAdd} className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded-full font-black hover:bg-indigo-600">+ Add Item</button>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

export default ManagePackages;