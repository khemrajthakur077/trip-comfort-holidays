import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaHotel, FaUtensils } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PackageCard = ({
  id,
  image,
  title,
  duration,
  from,
  to,
  hotel,
  meal,
  oldPrice,
  price,
}) => {
  const phone = "8091655570";

  // WhatsApp Message Generator
  const waMessage = encodeURIComponent(`Hi Trip Comfort! I'm interested in the "${title}" package (${duration}). Please share more details.`);

  return (
    <div className="group w-full max-w-[350px] bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 mx-auto my-6">
      
      {/* Image Section with Gradient Overlay */}
      <div className="relative overflow-hidden h-[220px]">
        <img 
        id= {id}
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Destination Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
          Featured Tour
        </div>

        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h3 className="text-xl font-bold leading-tight drop-shadow-md">{title}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaClock className="text-indigo-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="truncate">{to}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaHotel className="text-amber-500" />
            <span>{hotel}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaUtensils className="text-green-500" />
            <span>{meal}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
           <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">Price Starting From</p>
           <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-900 font-sans italic">₹{price}</span>
              <span className="text-gray-400 line-through text-sm">₹{oldPrice}</span>
              <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded ml-auto">SAVE ₹{oldPrice - price}</span>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-auto">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/91${phone}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 text-white h-11 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-100"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>

          {/* Call Button */}
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center bg-blue-500 text-white h-11 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
            title="Call Us"
          >
            <FaPhoneAlt size={18} />
          </a>

          {/* Details & Quote Buttons */}
           <Link to={`/tour/${id}`}
            className="col-span-2 flex items-center justify-center bg-indigo-600 text-white text-sm font-bold h-11 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100">
            DETAILS
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PackageCard;