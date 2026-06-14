import React from "react";
import { Link } from "react-router-dom";

const NewProductDrawer = ({ closeDrawerRight }) => {
  return (
    <div className="w-64 bg-[#284980] text-white py-1 pl-4 ">
      {/* Clickable Header */}
      <Link
        to={"/product-category/new-product"}
        onClick={() => closeDrawerRight()}
      >
        {" "}
        <button className="flex justify-between items-center w-full  py-3 text-lg font-semibold">
          New Product
        </button>
      </Link>
    </div>
  );
};

export default NewProductDrawer;
