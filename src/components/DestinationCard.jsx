const DestinationCard = (props) => {
  return (
    <div className="flex justify-center items-center">

      {/* Desktop Card */}
      <div className="hidden md:block w-[320px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
        
        <img
          src={props.img}
          alt={props.alt}
          className="w-full h-[220px] object-cover"
        />

        <div className="text-center py-4 text-lg font-semibold">
          {props.name}
        </div>

      </div>

      {/* Mobile Circle Card */}
      <div className="md:hidden text-center">

        <img
          src={props.img}
          alt={props.alt}
          className="w-20 h-20 rounded-full object-cover mx-auto border"
        />

        <p className="mt-2 text-sm font-medium">
          {props.name}
        </p>

      </div>

    </div>
  );
};

export default DestinationCard;