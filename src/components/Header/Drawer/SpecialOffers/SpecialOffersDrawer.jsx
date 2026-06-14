import React from "react";
import { Link } from "react-router-dom";

const SpecialOffersDrawer = () => {
  return (
    <div className="w-64 bg-[#284980] text-white py-1 pl-4 ">
      {/* Clickable Header */}
      <Link>
        {" "}
        <button className="flex justify-between items-center w-full  py-3 text-lg font-semibold">
          Special Offers
        </button>
      </Link>
    </div>
  );
};

export default SpecialOffersDrawer;
