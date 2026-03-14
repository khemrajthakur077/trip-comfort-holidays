import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

const MediaManager = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const BUCKET_NAME = 'Travelpkgimages';

  // 1. Fetch Images (Ab error handling aur clean hai)
  const fetchImages = async () => {
    try {
      setLoading(true);
      // .list('') ka matlab hai bucket ki root directory se files lao
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list('', { 
          limit: 100, 
          sortBy: { column: 'name', order: 'desc' } 
        });

      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      console.error('Fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 2. Upload Image
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file);

      if (error) throw error;
      
      fetchImages(); // Refresh list
      alert("Image Uploaded!");
    } catch (err) {
      alert("Upload Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // 3. Delete Image
  const handleDelete = async (fileName) => {
    if (!window.confirm("Delete this image forever?")) return;
    try {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([fileName]);

      if (error) throw error;
      setFiles(prev => prev.filter(f => f.name !== fileName));
    } catch (err) {
      alert("Delete Error: " + err.message);
    }
  };

  // 4. Copy URL
  const copyToClipboard = (fileName) => {
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    navigator.clipboard.writeText(data.publicUrl);
    setCopiedId(fileName);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-[2rem] shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Media Library</h1>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Bucket: {BUCKET_NAME}</p>
          </div>
          
          <label className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer hover:bg-indigo-600 transition-all active:scale-95 shadow-lg">
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            {uploading ? "UPLOADING..." : "ADD NEW IMAGE"}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
          </label>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-300">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="text-xs font-bold uppercase">Loading Storage...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.filter(f => f.name !== '.emptyFolderPlaceholder').map((file) => {
              const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name);
              return (
                <div key={file.id || file.name} className="group relative bg-white rounded-3xl p-2 shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img src={data.publicUrl} alt="" className="w-full h-full object-cover" />
                    
                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                      <button onClick={() => copyToClipboard(file.name)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition-transform shadow-lg">
                        {copiedId === file.name ? <CheckCircle size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      </button>
                      <button onClick={() => handleDelete(file.name)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-transform shadow-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 px-1">
                    <p className="text-[9px] font-bold text-slate-400 truncate uppercase tracking-tighter">{file.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && files.length <= 1 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 font-black text-sm uppercase">Your library is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;