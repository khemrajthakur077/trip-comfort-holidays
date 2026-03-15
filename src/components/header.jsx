import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaUser, FaBars, FaTimes, FaWallet, FaGift, FaBook } from "react-icons/fa";
import Logo from "../assets/TCH_logo.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Romantic Escapes", path: "/honeymoon" },
    { name: "Family Getaways", path: "/family" },
    { name: "Thrill Seekers", path: "/adventure" },
    { name: "Traveler Stories", path: "/guestGallery" },
  ];

  // WhatsApp Message encode kiya gaya hai
  const whatsappUrl = "https://wa.me/918091655570?text=Hello%20Trip%20Comfort%20Holidays!%20I%20want%20to%20get%20a%20quote%20for%20a%20tour%20package.";

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-md">
      {/* --- TOP BAR (Indigo Theme) --- */}
      <div className="hidden md:flex w-full h-[36px] bg-[#4F46E5] text-white items-center justify-between px-10 text-xs font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 hover:text-indigo-200 cursor-pointer transition">
            <FaPhoneAlt size={12} /> 80916-55570
          </span>
        </div>
        <div className="flex items-center gap-6 uppercase tracking-wider">
          <Link to="/pay"> <li className="flex items-center gap-1 list-none hover:text-indigo-200 transition"><FaWallet size={12}/> Pay Now</li></Link>
          <Link to="/blogs"> <li className="flex items-center gap-1 list-none hover:text-indigo-200 transition"><FaBook size={12}/> Blogs</li></Link>
          <Link to="/offers"><li className="flex items-center gap-1 list-none hover:text-indigo-200 transition"><FaGift size={12}/> Offers</li></Link>
          <Link to="/admin/login">
            <span className="flex items-center gap-2 border-l border-indigo-400 pl-4 transition hover:text-indigo-200">
              <FaUser className="cursor-pointer" />
            </span>
          </Link>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3">
        
        {/* LEFT: Logo & Branding */}
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src={Logo}
            alt="Trip Comfort Logo"
            className="h-[55px] md:h-[70px] transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-tight">
              Trip Comfort<span className="text-[#4F46E5]"> Holidays</span>
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-[2px] font-semibold">
              YOUR DREAM VACATIONS AWAITS
            </p>
          </div>
        </Link>

        {/* CENTER: Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 font-bold text-slate-600">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={`hover:text-[#4F46E5] transition-colors duration-300 ${location.pathname === link.path ? 'text-[#4F46E5]' : ''}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4F46E5] transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT: CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <button className="bg-[#4F46E5] text-white px-7 py-2.5 rounded-lg font-bold text-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-[#4338CA] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              GET QUOTE
            </button>
          </a>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#4F46E5] p-2 transition-transform active:scale-90"
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION --- */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[500px] border-t bg-slate-50' : 'max-h-0'}`}>
        <nav className="p-6">
          <ul className="flex flex-col gap-5 text-slate-700 font-bold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg hover:text-[#4F46E5] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-slate-200">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full block"
              >
                <button className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-bold hover:bg-[#4338CA] transition-colors">
                  GET QUOTE
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}