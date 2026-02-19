import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImg1 from "../assets/Images/aboutus1.webp";
import BannerImg2 from "../assets/Images/aboutus2.webp";
import BannerImg3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import AboutImg2 from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactFormSection";
const About = () => {
  return (
    <div className="w-full">

      {/* SECTION 1 */}
      <div className="relative bg-richblack-800">
        <section className="w-11/12 pt-12 pb-20 mx-auto text-white sm:pt-16 sm:pb-40">

          {/* Header */}
          <header className="max-w-4xl mx-auto space-y-4 text-center">
            <h1 className="text-xl font-semibold sm:text-3xl lg:text-4xl">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text="Brighter Future" />
            </h1>

            <p className="text-sm sm:text-base text-richblack-200">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          {/* Images */}
          <div className="flex flex-col gap-4 mt-10 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:-bottom-24 sm:flex-row sm:w-4/5 lg:w-3/5">
            {[BannerImg1, BannerImg2, BannerImg3].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Banner ${i}`}
                className="object-cover w-full rounded-lg sm:w-1/3"
              />
            ))}
          </div>

        </section>
      </div>

      {/* SECTION 2 */}
      <section className="pt-24 pb-16 border-b-2 bg-richblack-900 border-blue-5 sm:pt-32">
        <Quote />
      </section>

      {/* SECTION 3 */}
      <section className="border-b-2 bg-richblack-900 border-blue-5">
        <div className="w-11/12 pt-16 pb-20 mx-auto text-white">

          {/* Founding Story */}
          <div className="flex flex-col-reverse items-center gap-10 mb-20 lg:flex-row">
            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                Our Founding Story
              </h1>

              <p className="text-sm text-richblack-200 sm:text-base">
                Our e-learning platform was born out of a shared vision and passion
                for transforming education. It all began with a group of educators,
                technologists, and lifelong learners who recognized the need for
                accessible, flexible, and high-quality learning opportunities.
              </p>

              <p className="text-sm text-richblack-200 sm:text-base">
                We envisioned a platform that could bridge gaps and empower
                individuals from all walks of life to unlock their full potential.
              </p>
            </div>

            <div className="flex-1">
              <img
                src={AboutImg2}
                alt="Founding Story"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-semibold sm:text-3xl">Our Vision</h1>
              <p className="text-sm text-richblack-200 sm:text-base">
                With this vision in mind, we set out to create an e-learning
                platform that revolutionizes the way people learn using
                cutting-edge technology and engaging content.
              </p>
            </div>

            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-semibold sm:text-3xl">Our Mission</h1>
              <p className="text-sm text-richblack-200 sm:text-base">
                Our mission goes beyond courses. We foster a collaborative
                learning community through forums, live sessions, and networking.
              </p>
            </div>
          </div>

        </div>
      </section>
      
      {/* section 4 */}
      <section className="p-10 mb-20 text-white border-b-2 bg-richblack-800 border-blue-5">
        <Stats />
      </section>
      
      {/* section 5 */}
      <section >
        <LearningGrid />
        <ContactForm />
      </section>
    </div>
  );
};

export default About;
