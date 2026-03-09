import { useState } from "react";
import "../index.css";
import Logo from "../assets/TCH_logo.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">

      {/* TOP BAR */}
      <div className="hidden md:flex w-full h-[30px] bg-gradient-to-r from-orange-500 to-teal-400 text-white items-center justify-end pr-8 gap-8">
        <span>📞 80916-55570</span>
        <a href="#">Pay Now</a>
        <a href="#">Blogs</a>
        <a href="#">Offers</a>
        <span>👤</span>
      </div>

      {/* MAIN HEADER */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3">

        {/* LEFT (Logo + Text) */}
        <div className="flex items-center gap-3">

          <img
            src={Logo}
            alt="logo"
            className="h-[60px] md:h-[80px]"
          />

          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold">
              Trip Comfort Holidays
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Explore the Destination
            </p>
          </div>

        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10 font-semibold text-orange-600">
          <a href="#">Honeymoon</a>
          <a href="#">Family</a>
          <a href="#">Adventure</a>
          <a href="#">Guest Gallery</a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          <button className="hidden md:block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition">
            GET QUOTE
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl"
          >
            ☰
          </button>

        </div>

      </div>

      {/* MOBILE NAV */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">

          <nav className="flex flex-col gap-4 p-5 text-orange-600 font-semibold">
            <a href="#">Honeymoon</a>
            <a href="#">Family</a>
            <a href="#">Adventure</a>
            <a href="#">Guest Gallery</a>
          </nav>

        </div>
      )}

    </header>
  );
}