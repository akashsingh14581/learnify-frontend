import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div>
<div>
      {steps.map((item) => (
        <div
          key={item.id}
          className={`${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}
        >
          {step > item.id ? (<FaCheck />) : (item.id)}
        </div>
      ))}
    </div>
    <div>

    </div>
    </div>
    
  );
};

export default RenderSteps;
