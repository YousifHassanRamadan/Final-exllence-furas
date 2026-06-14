import React from "react";
import { Link } from "react-router-dom";

const SpringSalesDrawer = ({ closeDrawerRight }) => {
  return (
    <div className="w-64 bg-[#284980] text-white py-1 pl-4 ">
      {/* Clickable Header */}
      <Link to={"/best-sales"} onClick={() => closeDrawerRight()}>
        {" "}
        <button className="flex justify-start items-center w-full  py-3 text-lg font-semibold">
          Spring Sales
          <span className="py-1 px-4 rounded-2xl text-black text-[10px] bg-[#a0f709] ml-2 ">
            New
          </span>
        </button>
      </Link>
    </div>
  );
};

export default SpringSalesDrawer;
