import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";
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

const [search,setSearch] = useState("")
const [destination,setDestination] = useState("")
const [sort,setSort] = useState("")
const [maxPrice,setMaxPrice] = useState(50000)

let filtered = packages.filter(pkg =>
pkg.title.toLowerCase().includes(search.toLowerCase())
)

if(destination){
filtered = filtered.filter(pkg => pkg.destination === destination)
}

filtered = filtered.filter(pkg => pkg.price <= maxPrice)

if(sort === "low"){
filtered.sort((a,b)=> a.price - b.price)
}

if(sort === "high"){
filtered.sort((a,b)=> b.price - a.price)
}

  return (
    <div>

      {/* HERO SECTION */}
      <section className="w-auto h-auto">
        <img src={HeroImg} alt="travel" className="w-auto h-auto object-cover"/>
      </section>

      {/* HOLIDAY THEMES */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#EA580C] mb-4 mt-6">
        Holiday Theme's
      </h1>

      <div className="flex flex-wrap items-center gap-5 justify-center">

        <Link to="/honeymoon">
          <DestinationCard img={Honeymoon} name="Honeymoon"/>
        </Link>

        <Link to="/family"><DestinationCard img={Family} name="Family"/></Link>
       <Link to="/adventure"><DestinationCard img={Adventure} name="Adventure"/></Link> 

      </div>

      {/* INDIA DESTINATIONS */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#EA580C] mb-4 mt-6">
        India Top Holiday Destinations
      </h1>

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
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#EA580C] mb-4 mt-6">
        International Holiday Destination
      </h1>

      <div className="flex flex-wrap items-center gap-5 justify-center">

        <Link to="/singapore"><DestinationCard img={Singapore} name="Singapore"/></Link>
        <Link to="/dubai"><DestinationCard img={Dubai} name="Dubai"/></Link>

      </div>

      {/* PACKAGE FILTER SECTION */}

      <h1 className="text-3xl font-bold text-center mt-10">
        Holiday Packages
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mt-6">

        {/* Search */}
        <input
        type="text"
        placeholder="Search Package"
        className="border p-2 rounded"
        onChange={(e)=>setSearch(e.target.value)}
        />

        {/* Destination Filter */}
        <select
        className="border p-2 rounded"
        onChange={(e)=>setDestination(e.target.value)}
        >
        <option value="">All Destinations</option>
        <option value="Manali">Manali</option>
        <option value="Dubai">Dubai</option>
        <option value="Kashmir">Kashmir</option>
        <option value="Singapore">Singapore</option>
        </select>

        {/* Sort */}
        <select
        className="border p-2 rounded"
        onChange={(e)=>setSort(e.target.value)}
        >
        <option value="">Sort</option>
        <option value="low">Price Low → High</option>
        <option value="high">Price High → Low</option>
        </select>

      </div>

      {/* Price Filter */}
      <div className="text-center mt-4">

        <input
        type="range"
        min="10000"
        max="50000"
        value={maxPrice}
        onChange={(e)=>setMaxPrice(e.target.value)}
        />

        <p>Max Price ₹{maxPrice}</p>

      </div>

      {/* PACKAGES GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

        {filtered.map(pkg => (
          <PackageCard key={pkg.id} {...pkg}/>
        ))}

      </div>

      {/* FOOTER HERO SECTION */}
      <section className="w-full mt-[50px]">
        <img src={FooterHeroImg} alt="travel" className="w-full h-auto object-cover"/>
      </section>

    </div>
  );
};

export default Home;