import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-gray-200">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Column 1: Company Brand & Brief */}
        <div className="space-y-4">
          <Link to="/">
            <h2 className="text-[#4F46E5] font-bold text-2xl tracking-tight">
              Trip Comfort<span className="text-slate-900"> Holidays</span>
            </h2>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500">
            Your trusted partner for memorable Himalayan journeys and international escapes. We prioritize your comfort and experience.
          </p>
        </div>

        {/* Column 2: Who We Are */}
        <div>
          <h2 className="text-slate-900 font-bold text-lg mb-6 relative inline-block">
            Who We Are
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#4F46E5]"></span>
          </h2>
          <ul className="space-y-4">
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/about" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                About Us
              </Link>
            </li>
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/terms" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                Terms & Conditions
              </Link>
            </li>
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/privacy" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                Privacy Policy
              </Link>
            </li>
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/guestGallery" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                Guest Gallery
              </Link>
            </li>
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/pay" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                Pay Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h2 className="text-slate-900 font-bold text-lg mb-6 relative inline-block">
            Support
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#4F46E5]"></span>
          </h2>
          <ul className="space-y-4">
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/join-us" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                Travel Agent? Join Us
              </Link>
            </li>
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/faq" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                FAQ
              </Link>
            </li>
            <li className="group cursor-pointer text-sm hover:text-[#4F46E5] transition-colors duration-300">
              <Link to="/contact" className="flex items-center">
                <FaArrowRight className="text-[10px] mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-[#4F46E5]" />
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Details (No changes in details) */}
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
              <a href="tel:8091655570" className="text-sm hover:text-[#4F46E5] cursor-pointer transition-colors">+91 80916-55570</a>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-[#4F46E5]">
                <FaEnvelope size={14} />
              </div>
              <a href="mailto:tripcomfortholidays@gmail.com" className="text-sm break-all hover:text-[#4F46E5] cursor-pointer transition-colors">tripcomfortholidays@gmail.com</a>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-[#4F46E5] shrink-0">
                <FaMapMarkerAlt size={14} />
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                House No. 203/5, Bharoh, Near Mini Secretariat Sundernagar, Mandi, HP 175018
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
            <a href="https://www.facebook.com/share/14WtQSUqxS2/" target="_blank" rel="noreferrer" className="hover:text-[#4F46E5] cursor-pointer transition-colors">Facebook</a>
            <a href="https://www.instagram.com/tripcomfortholidays?igsh=N2FwNzByMGJ5Njlm" target="_blank" rel="noreferrer" className="hover:text-[#4F46E5] cursor-pointer transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@TripComfortHolidays" target="_blank" rel="noreferrer" className="hover:text-[#4F46E5] cursor-pointer transition-colors">U-Tube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}