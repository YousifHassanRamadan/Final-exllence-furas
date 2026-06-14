import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="mb-1.5 editGaps">
      <div className="relative inline-block">
        {/* Text */}
        <Link to={"/blog"}>
          {" "}
          <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer">
            Blog
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
