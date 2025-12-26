import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImg from "../../../assets/Images/timelineImage.avif"
const timeLine = [
  {
    logo: Logo1,
    heading: "Leardership",
    description: "Fully commited to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];
function TimelineSection() {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex gap-1.5 flex-1 ">
        <div className="flex flex-col">
        {timeLine.map((ele, index)=>{
          return (
            <div key={index}>
                  <div className="flex gap-3 mb-4 sm:mb-0">
            <div className="w-[50px] h-[50px] bg-white rounded-full drop-shadow-[0_0_8px_#ffffff] flex justify-center items-center">
              <img src={ele.logo} alt={`logo${index + 1}`} />
            </div>
            <div>
              <h2 className="font-semibold text-[18px]">{ele.heading}</h2>
              <p>{ele.description}</p>
            </div>
          </div>
          {
            index !== timeLine.length-1 &&  <div className="hidden w-full sm:flex">
            <div className="h-[50px] w-[25px] border-r-2 border-richblack-400 drop-shadow-[0_0_8px_#ffffff]">
              
            </div>
          </div>
          }
         
            </div>
      
          )
          
          
        })}
        </div>
      </div>

      <div className="relative flex-1">
        <img src={timeLineImg} alt="timelineImg" />
        <div className="absolute bottom-[-40px] p-2 sm:p-4 flex w-[95%] sm:w-[80%] text-white bg-caribbeangreen-700 left-1/2 translate-x-[-50%]">
          <div className="flex items-center justify-between flex-1 gap-2 p-4 sm:p-2">
            <p className="text-2xl font-semibold sm:text-5xl">10+</p>
            <p className="capitalize text-[14px] text-caribbeangreen-300">years or experience</p>
          </div>
          <div className="flex items-center justify-between flex-1 gap-2 p-4 border-l-2 border-white sm:p-2">
            <p className="text-2xl font-semibold sm:text-5xl">150+</p>
            <p className="capitalize text-[14px] text-caribbeangreen-300">type of courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
