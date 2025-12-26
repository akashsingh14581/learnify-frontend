import React from 'react'

function CourseCard({ cardData, currentCard, setCurrentCard }) {

  const isActive = currentCard === cardData.heading;

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`
        relative w-[300px] p-[2px] rounded-2xl cursor-pointer 
        transition-all duration-500
        ${
          isActive 
          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 scale-105 shadow-[0_0_25px_rgba(255,0,255,0.4)]" 
          : "bg-richblack-700 hover:bg-gradient-to-r hover:from-richblack-600 hover:to-richblack-500"
        }
      `}
    >

      {/* Inner Card */}
      <div className={`
        rounded-2xl h-full w-full p-6 
        backdrop-blur-xl transition-all duration-500
        ${
          isActive 
          ? "bg-white text-richblack-900" 
          : "bg-richblack-900/70 text-white"
        }
      `}>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold tracking-wide">
          {cardData.heading}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-6 
          ${isActive ? "text-richblack-600" : "text-richblack-300"}
        `}>
          {cardData.description}
        </p>

        {/* Bottom Info */}
        <div className={`flex justify-between text-sm pt-4 border-t 
          ${isActive ? "border-richblack-300" : "border-richblack-600"}
        `}>
          <span>Level: {cardData.level}</span>
          <span>{cardData.lessonNumber} Lessons</span>
        </div>

      </div>

    </div>
  )
}

export default CourseCard
