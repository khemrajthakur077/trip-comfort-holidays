import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const PackageCard = ({
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

  return (
    <div className="w-full max-w-[340px] min-h-[420px] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col my-[3vh]">

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover"
        />

        <div className="absolute bottom-0 w-full bg-gray-600 text-white text-center py-3 text-xl font-semibold">
          {title}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">

        <div className="space-y-4">

          {/* Info */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">

            <p>⏳ {duration}</p>
            <p>📍 {from} ➡ {to}</p>
            <p>🏨 {hotel}</p>
            <p>🍽 {meal}</p>

          </div>

          {/* Price */}
          <div className="space-y-1">

            <p className="text-gray-400 line-through">
              ₹{oldPrice}
            </p>

            <p>
              Starting From ₹
              <span className="text-green-600 font-bold text-xl">
                {price}
              </span>
              <span className="text-sm text-green-700">
                {" "} / Per Person
              </span>
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-around pt-4">

          <a
            href={`https://wa.me/91${phone}`}
            target="_blank"
            className="flex items-center justify-center bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
          >
            <FaWhatsapp />
          </a>

          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaPhoneAlt />
          </a>

          <button className="flex items-center justify-center bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 whitespace-nowrap">
            Details
          </button>

          <button className="flex items-center justify-center bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 whitespace-nowrap">
            Get Quote
          </button>

        </div>

      </div>

    </div>
  );
};

export default PackageCard;