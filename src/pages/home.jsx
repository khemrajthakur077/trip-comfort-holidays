import React from "react";
import HeroImg from "../assets/hero.png";
import FooterHeroImg from "../assets/footer_hero.png";
import DestinationCard from "../components/DestinationsCart";

// DESTINATION IMAGES
import Honeymoon from "../assets/Honeymoon.jpg";
import Family from "../assets/family.jpg";
import Adventure from "../assets/adventure.jpg";

import Himachal from "../assets/himachal.jpg";
import Kashmir from "../assets/kashmir.jpg";
import Kerala from "../assets/kerala.jpg";
import Rajstan from "../assets/rajstan.jpg";
import Sikkim from "../assets/sikkim.jpg";
import Uttarakhand from "../assets/uttarakhand.jpg";
import Spiti from "../assets/spiti.jpg";
import Leh from "../assets/leh.jpg";
import GoldenTriangle from "../assets/taj.jpg";

import Singapore from "../assets/Singapore.jpg";
import Dubai from "../assets/dubai.jpg";

const Home = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] md:h-[85vh]">
        <img
          src={HeroImg}
          alt="travel"
          className="absolute w-full h-full object-cover"
        />
      </section>

      {/* HOLIDAY THEMES */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#EA580C] mb-4 mt-6">
        Holiday Theme's
      </h1>

      <div className="flex flex-wrap items-center gap-5 justify-center">
        <DestinationCard img={Honeymoon} name="Honeymoon" alt="honeymoon img" />
        <DestinationCard img={Family} name="Family" alt="family img" />
        <DestinationCard img={Adventure} name="Adventure" alt="adventure img" />
      </div>

      {/* INDIA DESTINATIONS */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#EA580C] mb-4 mt-6">
        India Top Holiday Destinations
      </h1>

      <div className="flex flex-wrap items-center gap-5 justify-center">
        <DestinationCard img={Himachal} name="Himachal Pradesh" alt="hp img" />
        <DestinationCard img={Kashmir} name="Kashmir" alt="kashmir img" />
        <DestinationCard img={Kerala} name="Kerala" alt="kerala img" />
        <DestinationCard img={Rajstan} name="Rajstan" alt="rajstan img" />
        <DestinationCard img={Sikkim} name="Sikkim" alt="sikkim img" />
        <DestinationCard img={Uttarakhand} name="Uttarakhand" alt="uttarakhand img" />
        <DestinationCard img={Spiti} name="Spiti" alt="spiti img" />
        <DestinationCard img={Leh} name="Leh-Ladakh" alt="leh img" />
        <DestinationCard img={GoldenTriangle} name="Golden Triangle" alt="golden triangle img" />
      </div>

      {/* INTERNATIONAL DESTINATIONS */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#EA580C] mb-4 mt-6">
        International Holiday Destination
      </h1>

      <div className="flex flex-wrap items-center gap-5 justify-center">
        <DestinationCard img={Singapore} name="Singapore" alt="singapore img" />
        <DestinationCard img={Dubai} name="Dubai" alt="dubai img" />
      </div>

      {/* FOOTER HERO SECTION */}
      <section className="w-full mt-[50px]">
        <img
          src={FooterHeroImg}
          alt="travel"
          className="w-full h-auto object-cover"
        />
      </section>

    </div>
  );
};

export default Home;