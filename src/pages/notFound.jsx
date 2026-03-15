import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute inset-0 z-0 opacity-10">
        
      </div>

      <div className="relative z-10 text-center space-y-8 flex flex-col items-center">
        
        {/* Animated 404 & Compass */}
        <div className="relative flex items-center justify-center gap-6 md:gap-10">
          <h1 className="text-[120px] md:text-[200px] font-black text-slate-900 tracking-tighter leading-none animate-pulse">
            4
          </h1>
          <div className="relative w-24 h-24 md:w-40 md:h-40 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-2xl shadow-indigo-200 animate-spin-slow">
            <Compass size={48} className="text-white md:size-72" strokeWidth={1.5}/>
            <div className="absolute inset-0 bg-white/20 rounded-full scale-110 animate-pulse-slow"></div>
          </div>
          <h1 className="text-[120px] md:text-[200px] font-black text-slate-900 tracking-tighter leading-none animate-pulse delay-75">
            4
          </h1>
        </div>

        {/* Text & Message */}
        <div className="max-w-xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
            Oops! It seems you've taken a <span className="text-[#4F46E5]">wrong turn.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            The page you are looking for might have been moved, deleted, or perhaps it never existed in the first place. Don't worry, we will help you find your way back.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
          <Link 
            to="/" 
            className="flex items-center gap-3 bg-[#4F46E5] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 group active:scale-95"
          >
            <Home size={22} className="group-hover:-translate-y-0.5 transition-transform"/>
            Return to Homepage
          </Link>
          <Link 
            to="/packages" 
            className="flex items-center gap-3 bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition border border-slate-200 active:scale-95"
          >
            <Search size={22}/>
            Explore Tour Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;