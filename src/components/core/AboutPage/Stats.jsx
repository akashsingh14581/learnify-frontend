import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className="py-2 bg-richblack-800">
      <div className="w-11/12 mx-auto">

        <div className="grid grid-cols-2 text-center gap-y-8 gap-x-4 sm:grid-cols-4 sm:gap-6">
          {Stats.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2"
            >
              <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                {data.count}
              </h1>

              <p className="text-sm sm:text-base text-richblack-400">
                {data.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsComponent;
