import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div className="w-11/12 mx-auto text-sm leading-relaxed text-center text-richblack-200 sm:text-base lg:text-3xl">
      
      We are passionate about revolutionizing the way we learn. Our innovative
      platform{" "}
      <HighlightText text={"combines technology"} />
      <span className="text-brown-500"> expertise</span>, and community to create
      an
      <span className="text-brown-500">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
