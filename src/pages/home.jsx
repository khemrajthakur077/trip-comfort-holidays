import React from "react";
import HeroImg from "../assets/hero.png"; 
import FooterHeroImg from "../assets/footer_hero.png";

const Home = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] md:h-[85vh]">

        {/* Image */}
        <img
          src={HeroImg}
          alt="travel"
          className="absolute w-auto h-auto object-cover"
        />
      </section>

      {/*FOOTER HERO SECTION */}
      <section className="relative w-full h-[30vh] md:h-[50vh] mt-[50px] ">

        {/* Image */}
        <img
          src={FooterHeroImg}
          alt="travel"
          className=" w-auto h-auto "
        />
      </section>

    </div>
  );
};

export default Home;