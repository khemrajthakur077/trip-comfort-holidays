import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { 
  User, Phone, Mail, MessageSquare, 
  Trash2, Search, Calendar, AlertCircle 
} from 'lucide-react';

const InquiryQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // 1. Database se queries fetch karne ka function
  const getQueries = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setQueries(data || []);
    } catch (error) {
      console.error("Fetch Error:", error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getQueries();

    // 2. Real-time Subscription logic
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'inquiries' }, 
        () => {
          getQueries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [getQueries]);

  const handleDelete = async (id) => {
    if (window.confirm("Kya aap is query ko delete karna chahte hain?")) {
      try {
        const { error } = await supabase
          .from('inquiries')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        // Local state update karein taaki UI turant change ho
        setQueries(queries.filter(q => q.id !== id));
      } catch (error) {
        alert("Delete error: " + error.message);
      }
    }
  };

  // Filtering logic
  const filteredQueries = (queries || []).filter(q => 
    q.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Customer Queries</h1>
            <p className="text-slate-500 text-sm">Trip Comfort Holidays ki queries check karein.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search name or phone..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} />
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredQueries.map((query) => (
              <div key={query.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                        <User size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{query.name}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-tighter">
                        <Calendar size={10} /> {query.created_at ? new Date(query.created_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                      <a href={`tel:${query.phone}`} className="flex items-center gap-2 text-indigo-600 hover:underline">
                        <Phone size={16} /> {query.phone}
                      </a>
                      <a href={`mailto:${query.email}`} className="flex items-center gap-2 text-slate-500 hover:underline">
                        <Mail size={16} /> {query.email}
                      </a>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        "{query.message}"
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-2">
                    <button 
                      onClick={() => handleDelete(query.id)}
                      className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredQueries.length === 0 && (
          <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
            <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No queries found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryQueries;