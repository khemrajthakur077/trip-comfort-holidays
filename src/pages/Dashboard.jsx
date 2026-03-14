import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Tag, 
  LogOut, 
  PlusCircle, 
  TrendingUp,
  Loader2,
  Image as ImageIcon,
  MessageSquare // Naya icon import kiya queries ke liye
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  // stats mein queries add kiya
  const [stats, setStats] = useState({ blogs: 0, packages: 0, offers: 0, queries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
        const { count: pkgCount } = await supabase.from('packages').select('*', { count: 'exact', head: true });
        const { count: offerCount } = await supabase.from('offers').select('*', { count: 'exact', head: true });
        // Queries count fetch kiya
        const { count: queryCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true });
        
        setStats({
          blogs: blogCount || 0,
          packages: pkgCount || 0,
          offers: offerCount || 0,
          queries: queryCount || 0 
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      navigate('/admin/login', { replace: true });
    }
  };

  // menuItems mein naya Queries ka card add kiya
  const menuItems = [
    { label: 'Blogs', count: stats.blogs, icon: <FileText size={24} />, color: 'bg-blue-500', link: '/admin/manage-blogs' },
    { label: 'Tour Packages', count: stats.packages, icon: <Package size={24} />, color: 'bg-orange-500', link: '/admin/manage-packages' },
    { label: 'Special Offers', count: stats.offers, icon: <Tag size={24} />, color: 'bg-emerald-500', link: '/admin/manage-offers' },
    { label: 'Customer Queries', count: stats.queries, icon: <MessageSquare size={24} />, color: 'bg-purple-500', link: '/admin/view-queries' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* --- SIDEBAR --- */}
      <div className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-[#4F46E5] p-2 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <span className="font-black text-xl tracking-tight">Trip Admin</span>
        </div>

        <nav className="flex-1 space-y-3">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#4F46E5] rounded-2xl font-bold shadow-lg shadow-indigo-900/20 transition-all"
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          
          {menuItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => navigate(item.link)} 
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-2xl font-medium text-slate-400 hover:text-white transition-all"
            >
              {item.icon} {item.label}
            </button>
          ))}

          <button 
            onClick={() => navigate('/admin/media')} 
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-2xl font-medium text-slate-400 hover:text-white transition-all"
          >
            <ImageIcon size={20} /> Media Library
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl font-bold transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>

      {/* --- MAIN PANEL --- */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Vijay Thakur's Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your Himachal travel agency and blogs.</p>
          </div>
          <button 
            onClick={() => navigate('/admin/manage-packages')}
            className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <PlusCircle size={20} /> Create New Package
          </button>
        </header>

        {/* --- STATS CARDS --- */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuItems.map((item) => (
              <div 
                key={item.label}
                onClick={() => navigate(item.link)}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`${item.color} p-4 rounded-2xl text-white shadow-lg shadow-${item.color.split('-')[1]}-200`}>
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-800">{item.count}</span>
                </div>
                <h3 className="text-slate-400 font-black uppercase text-xs tracking-widest group-hover:text-[#4F46E5] transition-colors">
                  {item.label}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* --- QUICK TIP --- */}
        <div className="mt-12 bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-2">Admin Tip! 💡</h2>
            <p className="text-indigo-100 font-medium max-w-xl">
              Naye tour packages add karte waqt <b>'Old Price'</b> zaroor daalein, isse website par 'Discount' tag automatic show hota hai jo customers ko attract karta hai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;