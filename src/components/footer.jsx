import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-gray-200">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Column 1: Company Brand & Brief */}
        <div className="space-y-4">
          <h2 className="text-[#4F46E5] font-bold text-2xl tracking-tight">
            Trip Comfort<span className="text-slate-900"> Holidays</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500">
            Your trusted partner for memorable Himalayan journeys and international escapes. We prioritize your comfort and experience.
          </p>
        </div>

        {/* Column 2: Quick Links (Who We Are) */}
        <div>
          <h2 className="text-slate-900 font-bold text-lg mb-6 relative inline-block">
            Who We Are
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#4F46E5]"></span>
          </h2>
          <ul className="space-y-4">
            {["About Us", "Terms & Conditions", "Privacy Policy", "Guest Gallery", "Pay Now"].map((item) => (
              <li key={item} className="flex items-center group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Support Section */}
        <div>
          <h2 className="text-slate-900 font-bold text-lg mb-6 relative inline-block">
            Support
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#4F46E5]"></span>
          </h2>
          <ul className="space-y-4 text-sm">
            {["Travel Agent? Join Us", "FAQ", "Contact Us"].map((item) => (
              <li key={item} className="flex items-center group cursor-pointer hover:text-[#4F46E5] transition-colors duration-300">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div>
          <h2 className="text-slate-900 font-bold text-lg mb-6 relative inline-block">
            Contact Info
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#4F46E5]"></span>
          </h2>
          
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-[#4F46E5]">
                <FaPhoneAlt size={14} />
              </div>
              <span className="text-sm hover:text-[#4F46E5] cursor-pointer transition-colors">+91 80916-55570</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-[#4F46E5]">
                <FaEnvelope size={14} />
              </div>
              <span className="text-sm break-all hover:text-[#4F46E5] cursor-pointer transition-colors">tripcomfortholidays@gmail.com</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-[#4F46E5] shrink-0">
                <FaMapMarkerAlt size={14} />
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                House No. 203/5, Bharoh, near mini secretariat Sundernagar, Mandi, HP 175018
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
          <p>© 2026 Trip Comfort Holidays. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#4F46E5] cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-[#4F46E5] cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-[#4F46E5] cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}