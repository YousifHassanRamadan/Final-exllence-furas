import React from "react";
import { Link } from "react-router-dom";

const BrandsDrawer = ({ closeDrawerRight }) => {
  return (
    <div className="w-64 bg-[#284980] text-white py-1 pl-4 ">
      {/* Clickable Header */}
      <Link to={"/brands"} onClick={() => closeDrawerRight()}>
        {" "}
        <button className="flex justify-start items-center w-full  py-3 text-lg font-semibold ">
          Brands{" "}
          <span className="py-1 px-4 rounded-2xl text-black text-[10px] bg-[#f8c530] ml-2 ">
            HOT
          </span>
        </button>
      </Link>
    </div>
  );
};

export default BrandsDrawer;
