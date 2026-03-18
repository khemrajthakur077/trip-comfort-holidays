import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Plus, Trash2, Edit3, Loader2, X, Calendar, CheckCircle2, 
  XCircle, Image as ImageIcon, MapPin, Clock, Hotel, Utensils,
  Tag, Info, DollarSign, PlaneTakeoff, PlaneLanding, Layers, Star
} from 'lucide-react';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    category: '', title: '', destination: '', duration: '',
    from_location: '', to_location: '', hotel: '', meal: '',
    old_price: '', price: '', image_url: '', subtitle: ''
  };

  const [formData, setFormData] = useState(initialForm);
  // UPDATE: Naya structure with Stay, Highlight, and Spots
  const [itinerary, setItinerary] = useState([{ day: "Day 1", title: '', stay: '', highlight: '', spots: '' }]);
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
    if (state.length > 1) setter(state.filter((_, i) => i !== index));
    else setter(['']); 
  };

  // UPDATE: Logic to load structured data into form
  const startEdit = (pkg) => {
    if (!pkg) return;
    setEditingId(pkg.id);
    
    setFormData({
      category: pkg.category || '',
      title: pkg.title || '',
      destination: pkg.destination || '',
      duration: pkg.duration || '',
      from_location: pkg.from_location || '',
      to_location: pkg.to_location || '',
      hotel: pkg.hotel || '',
      meal: pkg.meal || '',
      old_price: pkg.old_price || '',
      price: pkg.price || '',
      image_url: pkg.image_url || '',
      subtitle: pkg.subtitle || ''
    });

    let rawItinerary = [];
    try {
      rawItinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : JSON.parse(pkg.itinerary || '[]');
    } catch (e) { rawItinerary = []; }

    setItinerary(rawItinerary.length > 0 
      ? rawItinerary.map((it, idx) => ({
            day: it.day || `Day ${idx + 1}`,
            title: it.title || '',
            stay: it.stay || '',
            highlight: it.highlight || '',
            // Array ko vapas comma string mein badalna edit ke liye
            spots: Array.isArray(it.spots) ? it.spots.join(', ') : (it.spots || it.desc || '')
          }))
      : [{ day: "Day 1", title: '', stay: '', highlight: '', spots: '' }]);

    const parseList = (list) => {
      if (Array.isArray(list)) return list.length > 0 ? list : [''];
      try { 
        const p = JSON.parse(list); 
        return Array.isArray(p) ? p : [list]; 
      } catch { return list ? [list] : ['']; }
    };

    setInclusions(parseList(pkg.inclusions));
    setExclusions(parseList(pkg.exclusions));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(initialForm);
    setItinerary([{ day: "Day 1", title: '', stay: '', highlight: '', spots: '' }]);
    setInclusions(['']);
    setExclusions(['']);
  };

  // UPDATE: Logic to save spots as Array
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalInclusions = inclusions.filter(i => i.trim() !== '');
      const finalExclusions = exclusions.filter(e => e.trim() !== '');
      
      const finalItinerary = itinerary
        .filter(it => it.title.trim() !== '')
        .map((it, idx) => ({
            day: `Day ${idx + 1}`,
            title: it.title.trim(),
            stay: it.stay ? it.stay.trim() : "N/A",
            highlight: it.highlight ? it.highlight.trim() : "",
            // Comma string ko Array mein badalna website ke liye
            spots: typeof it.spots === 'string' 
                   ? it.spots.split(',').map(s => s.trim()).filter(s => s !== "")
                   : (it.spots || [])
        }));

      const payload = {
        ...formData,
        price: Number(formData.price),
        old_price: formData.old_price ? Number(formData.old_price) : null,
        itinerary: finalItinerary,
        inclusions: finalInclusions,
        exclusions: finalExclusions
      };

      const { error } = editingId 
        ? await supabase.from('packages').update(payload).eq('id', editingId)
        : await supabase.from('packages').insert([payload]);

      if (error) throw error;
      
      alert(editingId ? "Package Updated!" : "New Package Published!");
      resetForm();
      fetchPackages();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Travel Package Master</h1>
          <p className="text-slate-500 font-medium">Create and manage your global tour inventory</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-8 sticky top-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                <h2 className="text-2xl font-black text-indigo-600 flex items-center gap-3">
                  {editingId ? <Edit3 className="text-indigo-500" /> : <Plus className="text-indigo-500" />}
                  {editingId ? 'Modify Package' : 'Create New Package'}
                </h2>
                {editingId && (
                  <button type="button" onClick={resetForm} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full font-bold text-sm hover:bg-rose-100 transition-all flex items-center gap-2">
                    <X size={16}/> Cancel Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup icon={<Tag size={18}/>} label="Category" placeholder="e.g. Honeymoon, Family" value={formData.category} onChange={v => setFormData({...formData, category: v})} />
                <InputGroup icon={<Info size={18}/>} label="Package Title" placeholder="Full Package Name" value={formData.title} onChange={v => setFormData({...formData, title: v})} required />
                <InputGroup icon={<MapPin size={18}/>} label="Destination" placeholder="City, Country" value={formData.destination} onChange={v => setFormData({...formData, destination: v})} />
                <InputGroup icon={<Clock size={18}/>} label="Duration" placeholder="e.g. 5N / 6D" value={formData.duration} onChange={v => setFormData({...formData, duration: v})} />
                <InputGroup icon={<PlaneTakeoff size={18}/>} label="From" placeholder="Starting City" value={formData.from_location} onChange={v => setFormData({...formData, from_location: v})} />
                <InputGroup icon={<PlaneLanding size={18}/>} label="To" placeholder="Return City" value={formData.to_location} onChange={v => setFormData({...formData, to_location: v})} />
                <InputGroup icon={<Hotel size={18}/>} label="Hotel" placeholder="Hotel Name or Stars" value={formData.hotel} onChange={v => setFormData({...formData, hotel: v})} />
                <InputGroup icon={<Utensils size={18}/>} label="Meal Plan" placeholder="Breakfast, Dinner etc." value={formData.meal} onChange={v => setFormData({...formData, meal: v})} />
                <InputGroup icon={<DollarSign size={18}/>} label="Current Price" type="number" placeholder="Offer Price" value={formData.price} onChange={v => setFormData({...formData, price: v})} required />
                <InputGroup icon={<Layers size={18}/>} label="Old Price" type="number" placeholder="Original Price" value={formData.old_price} onChange={v => setFormData({...formData, old_price: v})} />
                <div className="md:col-span-2">
                   <InputGroup icon={<ImageIcon size={18}/>} label="Image URL" placeholder="https://image-link.com/photo.jpg" value={formData.image_url} onChange={v => setFormData({...formData, image_url: v})} />
                </div>
                <div className="md:col-span-2">
                   <InputGroup icon={<Info size={18}/>} label="Subtitle / Tagline" placeholder="Short catchphrase for the package" value={formData.subtitle} onChange={v => setFormData({...formData, subtitle: v})} />
                </div>
              </div>

              {/* UPDATE: Structured Itinerary Fields */}
              <SectionWrapper title="Detailed Itinerary" icon={<Calendar className="text-indigo-500" size={20}/>} onAdd={() => setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, title: '', stay: '', highlight: '', spots: '' }])}>
                {itinerary.map((day, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-[2rem] space-y-4 border border-slate-100 relative shadow-sm">
                    <button type="button" onClick={() => handleRemoveRow(setItinerary, itinerary, i)} className="absolute right-6 top-6 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
                    
                    <div className="flex items-center gap-2">
                        <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Day {i + 1}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Daily Title</label>
                            <input type="text" placeholder="e.g. Arrival & Leisure" className="w-full p-3 text-sm font-bold rounded-xl border-none shadow-inner outline-none focus:ring-2 ring-indigo-500" value={day.title} onChange={e => { const upd = [...itinerary]; upd[i].title = e.target.value; setItinerary(upd); }} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Stay Details</label>
                            <input type="text" placeholder="e.g. 3★ Hotel in Singapore" className="w-full p-3 text-sm rounded-xl border-none shadow-inner outline-none focus:ring-2 ring-indigo-500" value={day.stay} onChange={e => { const upd = [...itinerary]; upd[i].stay = e.target.value; setItinerary(upd); }} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Main Highlight</label>
                        <input type="text" placeholder="e.g. Evening Night Safari" className="w-full p-3 text-sm rounded-xl border-none shadow-inner outline-none focus:ring-2 ring-indigo-500" value={day.highlight} onChange={e => { const upd = [...itinerary]; upd[i].highlight = e.target.value; setItinerary(upd); }} />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Sightseeing Spots (Comma Separated)</label>
                        <textarea placeholder="Merlion Park, Marina Bay, Night Safari..." className="w-full p-3 text-sm rounded-xl border-none shadow-inner h-24 resize-none outline-none focus:ring-2 ring-indigo-500" value={day.spots} onChange={e => { const upd = [...itinerary]; upd[i].spots = e.target.value; setItinerary(upd); }} />
                    </div>
                  </div>
                ))}
              </SectionWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SectionWrapper title="Inclusions" icon={<CheckCircle2 className="text-emerald-500" size={20}/>} onAdd={() => handleAddRow(setInclusions, inclusions)}>
                  {inclusions.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <input className="flex-1 p-3 text-sm bg-slate-50 rounded-xl outline-none border-none shadow-inner" value={item} onChange={e => handleUpdateRow(setInclusions, inclusions, i, e.target.value)} />
                      <button type="button" onClick={() => handleRemoveRow(setInclusions, inclusions, i)} className="text-slate-300 hover:text-rose-500"><X size={18}/></button>
                    </div>
                  ))}
                </SectionWrapper>
                <SectionWrapper title="Exclusions" icon={<XCircle className="text-rose-500" size={20}/>} onAdd={() => handleAddRow(setExclusions, exclusions)}>
                  {exclusions.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <input className="flex-1 p-3 text-sm bg-slate-50 rounded-xl outline-none border-none shadow-inner" value={item} onChange={e => handleUpdateRow(setExclusions, exclusions, i, e.target.value)} />
                      <button type="button" onClick={() => handleRemoveRow(setExclusions, exclusions, i)} className="text-slate-300 hover:text-rose-500"><X size={18}/></button>
                    </div>
                  ))}
                </SectionWrapper>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-600 transform active:scale-95 transition-all flex items-center justify-center gap-4">
                {loading ? <Loader2 className="animate-spin" /> : (editingId ? "Update This Package" : "Publish to Website")}
              </button>
            </form>
          </div>

          <div className="xl:col-span-5">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden sticky top-6">
                <div className="p-6 bg-slate-50/50 border-b flex justify-between items-center">
                    <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">Package Inventory</h3>
                    <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-black">{packages.length} Packages</span>
                </div>
                <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {fetching ? (
                        <div className="p-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                            <Loader2 className="animate-spin" size={40} />
                            <p className="font-bold">Syncing Database...</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <tbody className="divide-y divide-slate-50">
                                {packages.map(pkg => (
                                    <tr key={pkg.id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="p-5 flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className="relative">
                                                  <img src={pkg.image_url || 'https://via.placeholder.com/150'} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                                                  <span className="absolute -top-2 -left-2 bg-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm border border-slate-100">ID: {pkg.id}</span>
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm line-clamp-1">{pkg.title}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                      <span className="text-xs font-bold text-indigo-500">₹{pkg.price}</span>
                                                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{pkg.destination || 'Global'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEdit(pkg)} className="p-3 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all"><Edit3 size={18}/></button>
                                                <button onClick={async () => {
                                                    if(window.confirm("Confirm Delete?")) {
                                                        const { error } = await supabase.from('packages').delete().eq('id', pkg.id);
                                                        if(!error) fetchPackages();
                                                    }
                                                }} className="p-3 text-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-white rounded-2xl transition-all"><Trash2 size={18}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ icon, label, type = "text", placeholder, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input type={type} placeholder={placeholder} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-indigo-500 border-none shadow-inner text-sm font-medium" value={value} onChange={e => onChange(e.target.value)} required={required} />
  </div>
);

const SectionWrapper = ({ title, icon, onAdd, children }) => (
  <div className="space-y-4 pt-8 border-t border-slate-50">
    <div className="flex justify-between items-center">
      <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">{icon} {title}</h3>
      <button type="button" onClick={onAdd} className="text-[10px] bg-indigo-600 text-white px-4 py-2 rounded-full font-black hover:shadow-lg hover:shadow-indigo-200 transition-all">+ Add New Row</button>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export default ManagePackages;