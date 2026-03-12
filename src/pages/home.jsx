
import DestinationCard from "../components/DestinationCard";
import PackageCard from "../components/PackageCard";

import { Link } from "react-router-dom";

// DESTINATION IMAGES
import Honeymoon from "../assets/honeymoon.jpg";
import Family from "../assets/family.jpg";
import Adventure from "../assets/adventure.jpg";
import HeroImg from "../assets/hero.png";
import FooterHeroImg from "../assets/footer_hero.png";

import Himachal from "../assets/himachal.jpg";
import Kashmir from "../assets/kashmir.jpg";
import Kerala from "../assets/kerala.jpg";
import Rajstan from "../assets/rajstan.jpg";
import Sikkim from "../assets/sikkim.jpg";
import Uttarakhand from "../assets/uttarakhand.jpg";
import Spiti from "../assets/spiti.jpg";
import Leh from "../assets/leh.jpg";
import GoldenTriangle from "../assets/taj.jpg";

import Singapore from "../assets/singapore.jpg";
import Dubai from "../assets/dubai.jpg";

const Home = () => {




  return (
    <div>

      {/* HERO SECTION */}
      <section className="w-auto h-auto">
        <img src={HeroImg} alt="travel" className="w-auto h-auto object-cover"/>
      </section>

      {/* HOLIDAY THEMES */}
      <div className="flex flex-col items-center justify-center space-y-2 mb-10 mt-16 px-4">
  {/* Modern Tagline */}
  <span className="text-[#4F46E5] text-xs md:text-sm font-bold tracking-[0.25em] uppercase bg-indigo-50 px-3 py-1 rounded-md">
    Choose Your Style
  </span>

  {/* Main Heading */}
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 text-center tracking-tight">
    Explore <span className="text-[#4F46E5]">Holiday</span> Themes
  </h1>

  {/* Decorative Divider */}
  <div className="flex items-center gap-1.5 pt-2">
    <div className="h-1 w-2 bg-indigo-200 rounded-full"></div>
    <div className="h-1 w-12 bg-[#4F46E5] rounded-full"></div>
    <div className="h-1 w-2 bg-indigo-200 rounded-full"></div>
  </div>

  {/* Supporting Text */}
  <p className="max-w-xl text-center text-slate-500 text-sm md:text-base mt-2">
    Whether you're looking for a romantic escape or a thrilling adventure, we have the perfect theme for your next journey.
  </p>
</div>

      <div className="flex flex-wrap items-center gap-5 justify-center">

        <Link to="/honeymoon">
          <DestinationCard img={Honeymoon} name="Honeymoon"/>
        </Link>

        <Link to="/family"><DestinationCard img={Family} name="Family"/></Link>
       <Link to="/adventure"><DestinationCard img={Adventure} name="Adventure"/></Link> 

      </div>

      {/* INDIA DESTINATIONS */}
     <div className="flex flex-col items-center justify-center space-y-2 mb-10 mt-12 px-4">
  {/* Subtle Sub-heading / Tagline */}
  <span className="text-[#4F46E5] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
    Handpicked for You
  </span>

  {/* Main Heading */}
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 text-center tracking-tight leading-tight">
    India's <span className="text-[#4F46E5]">Top Holiday</span> Destinations
  </h1>

  {/* Underline Decoration */}
  <div className="flex items-center gap-2 pt-1">
    <div className="h-1.5 w-12 bg-[#4F46E5] rounded-full"></div>
    <div className="h-1.5 w-4 bg-indigo-200 rounded-full"></div>
  </div>
  
  {/* Optional: Short Description */}
  <p className="max-w-2xl text-center text-slate-500 text-sm md:text-base mt-2">
    Discover the soul of India with our most loved getaways, from snowy peaks to serene beaches.
  </p>
</div>

      <div className="flex flex-wrap items-center gap-5 justify-center">

        <Link to="/himachal"><DestinationCard img={Himachal} name="Himachal Pradesh"/></Link>
        <Link to="/kashmir"><DestinationCard img={Kashmir} name="Kashmir"/></Link>
        <Link to="/kerala"><DestinationCard img={Kerala} name="Kerala"/></Link>
        <Link to="/rajstan"><DestinationCard img={Rajstan} name="Rajstan"/></Link>
        <Link to="/sikkim"><DestinationCard img={Sikkim} name="Sikkim"/></Link>
        <Link to="/uttarakhand"><DestinationCard img={Uttarakhand} name="Uttarakhand"/></Link>
        <Link to="/spiti"><DestinationCard img={Spiti} name="Spiti"/></Link>
        <Link to="/lehLadakh"><DestinationCard img={Leh} name="Leh-Ladakh"/></Link>
        <Link to="/goldenTriangle"><DestinationCard img={GoldenTriangle} name="Golden Triangle"/></Link>

      </div>

      {/* INTERNATIONAL DESTINATIONS */}
    <div className="relative flex flex-col items-center justify-center space-y-2 mb-10 mt-20 px-4 overflow-hidden">
  
  {/* Decorative Background Element (Optional: Subtle text behind) */}
  <div className="absolute -top-4 text-slate-100 text-7xl md:text-9xl font-black select-none z-0 opacity-40">
    GLOBAL
  </div>

  <div className="relative z-10 flex flex-col items-center">
    {/* Global Tagline */}
    <span className="flex items-center gap-2 text-[#4F46E5] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-1">
      <span className="h-[1px] w-6 bg-[#4F46E5]"></span>
      World Awaits You
      <span className="h-[1px] w-6 bg-[#4F46E5]"></span>
    </span>

    {/* Main Heading */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 text-center tracking-tight leading-tight">
      International <span className="text-[#4F46E5]">Destinations</span>
    </h1>

    {/* Modern Triple-Dot Divider */}
    <div className="flex items-center gap-2 pt-3">
      <div className="h-2 w-2 bg-indigo-200 rounded-full animate-pulse"></div>
      <div className="h-2 w-16 bg-[#4F46E5] rounded-full"></div>
      <div className="h-2 w-2 bg-indigo-200 rounded-full animate-pulse"></div>
    </div>
    
    {/* Description */}
    <p className="max-w-2xl text-center text-slate-500 text-sm md:text-base mt-4 leading-relaxed font-medium">
      From the skyscrapers of Singapore to the serene islands of Maldives, explore the world with Trip Comfort's curated international tours.
    </p>
  </div>
</div>

      <div className="flex flex-wrap items-center gap-5 justify-center">

        <Link to="/singapore"><DestinationCard img={Singapore} name="Singapore"/></Link>
        <Link to="/dubai"><DestinationCard img={Dubai} name="Dubai"/></Link>

      </div>

     

      {/* FOOTER HERO SECTION */}
      <section className="w-full mt-[50px]">
        <img src={FooterHeroImg} alt="travel" className="w-full h-auto object-cover"/>
      </section>

    </div>
  );
};

export default Home;