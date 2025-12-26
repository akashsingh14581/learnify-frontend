import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkedTo }) {
  return (
    <div className="w-fit">
      <Link to={linkedTo}>
        <div
          className={`w-fit rounded-md lg:text-[16px] text-[14px] font-bold px-6 py-3 capitalize ${
            active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"
          } hover:scale-95 transition-all duration-200`}
        >
          {children}
        </div>
      </Link>
    </div>
  );
}

export default Button;
