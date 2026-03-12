const DestinationCard = (props) => {
  return (
    <div className="flex justify-center items-center group cursor-pointer">
      
      {/* --- Desktop Card (Premium Look) --- */}
      <div className="hidden md:block w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
        
        {/* Image Container with Zoom Effect */}
        <div className="relative overflow-hidden h-[200px]">
          <img
            src={props.img}
            alt={props.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
        </div>

        {/* Text Area */}
        <div className="p-5 text-center bg-white">
          <h3 className="text-slate-800 text-lg font-bold tracking-tight group-hover:text-[#4F46E5] transition-colors">
            {props.name}
          </h3>
          <div className="mt-2 w-0 h-1 bg-[#4F46E5] mx-auto rounded-full group-hover:w-16 transition-all duration-500"></div>
        </div>

      </div>

      {/* --- Mobile Circle Card (Clean & Compact) --- */}
      <div className="md:hidden flex flex-col items-center gap-2">
        
        {/* Circle with Border Glow */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 active:scale-90 transition-transform">
          <div className="bg-white p-0.5 rounded-full">
            <img
              src={props.img}
              alt={props.alt}
              className="w-[72px] h-[72px] rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>
        </div>

        {/* Text with modern styling */}
        <p className="text-[13px] font-bold text-slate-700 tracking-tight">
          {props.name}
        </p>

      </div>

    </div>
  );
};

export default DestinationCard;