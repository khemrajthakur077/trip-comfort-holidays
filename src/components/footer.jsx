import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#e9eef1] text-gray-700  text-center md:text-left">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-red-600 font-semibold text-lg mb-4">
            Who We Are
          </h2>

          <ul className="space-y-3">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Guest Gallery</li>
            <li>Pay Now</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-red-600 font-semibold text-lg mb-4">
            Support
          </h2>

          <ul className="space-y-3">
            <li>Travel Agent? Join Us</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>

          <h2 className="text-red-600 font-semibold text-lg mb-4 ">
            Contact Us
          </h2>

          <div className="space-y-3 mb-6">

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaPhoneAlt className="text-pink-500" />
              <span>80916-55570</span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaEnvelope className="text-blue-500" />
              <span>tripcomfortholidays@gmail.com</span>
            </div>

          </div>

          <h2 className="text-red-600 font-semibold text-lg mb-3">
            Corporate Office
          </h2>

          <p className="text-gray-600">
            House No. 203/5 , Bharoh, near mini secretariat Sundernagar, Mandi , Himachal Pradesh 175018
          </p>

        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-600 py-6 text-sm">
        © 2026 Trip Comfort Holidays Pvt Ltd. All Rights Reserved
      </div>

    </footer>
  );
}