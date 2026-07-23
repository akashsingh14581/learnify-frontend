import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

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
    <>
      <div className="mb-8 flex items-center justify-center gap-x-4">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center gap-y-1">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full border-[1px] font-semibold
                  ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                      : step > item.id
                      ? "border-richblack-500 bg-richblack-500 text-richblack-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
              <p className="text-xs text-richblack-300">{item.title}</p>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`h-[2px] w-[60px] ${
                  step > item.id ? "bg-richblack-500" : "bg-richblack-700"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
