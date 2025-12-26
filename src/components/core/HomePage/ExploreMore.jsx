import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from './CourseCard'

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value)=>{
    setCurrentTab(value);
    const result = HomePageExplore.filter((course)=> course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading)
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-4xl font-semibold text-center text-white">
          Unlock the <HighlightText text={"Power of Code"} />
        </h2>
        <p className="font-semibold text-richblack-400">
          Learn to Build Anything You Can Imagine
        </p>
        <div className="flex text-[12px] sm:text-[16px] flex-wrap justify-center gap-2 p-2 sm:gap-5 sm:rounded-full bg-richblack-800">
          {tabsName.map((tab, index) => {
            return (
              <div key={index}
                className={`hover:text-richblack-5 hover:bg-richblack-900 cursor-pointer px-5 py-2 rounded-full ${
                  currentTab === tab ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"
                }`} onClick={()=>setMyCard(tab)}
              >
                {tab}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 mt-10 mb-[-102px]">
            {
                courses.map((card, index)=>{
                    return <CourseCard key={index} cardData={card} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                })
            }
        </div>
      </div>
    </div>
  );
}

export default ExploreMore;
