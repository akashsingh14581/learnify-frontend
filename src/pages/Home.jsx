import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearnLanguageSection from "../components/core/HomePage/LearnLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from "../components/common/Footer";
import ExploreMore from '../components/core/HomePage/ExploreMore'
function Home() {
  return (
    <div>
      {/*----- section 1 -----*/}
      <div className="relative flex flex-col items-center w-11/12 mx-auto text-white">
        <Link to="/signup">
          <div className="flex items-center gap-2 px-4 py-2 mt-16 font-bold capitalize transition-all duration-200 rounded-full bg-richblack-800 text-richblack-200 hover:scale-95 hover:bg-richblack-900 hover:outline hover:outline-1 hover:outline-richblack-300 hover:outline-offset-2">
            <p>become an instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <div className="mt-3 text-3xl font-bold leading-tight text-center uppercase sm:text-4xl md:text-5xl max-w-11/12">
          empower your future growth <HighlightText text={"Coding Skills"} />
        </div>
        <div className="mt-4 leading-relaxed text-center sm:text-lg text-richblack-300 max-w-11/12">
          Master the skills that top tech companies demand and build real-world
          projects that make you stand out. Learn at your own pace, get guided
          support, and upgrade your coding journey with confidence.
        </div>

        <div className="flex mt-4 gap-7">
          <CTAButton linkedTo={"/signup"} active={true}>
            Learn more
          </CTAButton>
          <CTAButton linkedTo={"/login"} active={false}>
            book a demo
          </CTAButton>
        </div>

        {/* video section */}
        <div className="mt-4 overflow-hidden shadow-blue-200">
          <video autoPlay muted loop src={Banner}></video>
        </div>

        {/* code section */}
        <div>
          <CodeBlock
            position={`lg:flex-row`}
            heading={
              <div className="text-4xl font-semibold">
                unlock your
                <HighlightText text={"coding potential"} /> {""}
                with our online courses
              </div>
            }
            subheading={
              "Join thousands of learners and gain practical coding skills with hands-on projects, expert guidance, and interactive lessons. Build real-world applications and level up your career."
            }
            ctbtn1={{
              btnText: "try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctbtn2={{
              btnText: "try it yourself",
              linkTo: "/login",
              active: false,
            }}
            codeblock={
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>'
            }
          />
        </div>
      </div>

      <div className="w-11/12 py-10 mx-auto">
        <ExploreMore/>
      </div>
      {/* section 2 */}
      <div className="pb-20 mx-auto text-richblack-700 bg-pure-greys-5">
        <div className="homepage-bg h-[300px]">
          <div className="flex items-center justify-center w-11/12 gap-5 mx-auto h-[300px]">
            <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-5">
              <CTAButton active={true} linkedTo={"/signup"}>
                <p className="flex items-center gap-2 capitalize">
                  explore full catelog <FaArrowRight />
                </p>
              </CTAButton>
              <CTAButton active={false} linkedTo={"/signup"}>
                <p className="flex items-center gap-2 capitalize">
                  learn more <FaArrowRight />
                </p>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-11/12 mx-auto gap-7 mt-10 sm:mt-[100px]">
          <div className="flex flex-wrap w-full gap-5">
            <div className="flex-1 text-4xl font-semibold capitalize">
              get the skills you need for a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>
            <div className="flex flex-col gap-2 lg:flex-1">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkedTo={"/signup"}>
                <p>Learn More</p>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-11/12 gap-20 mx-auto mt-20 g">
          <TimelineSection />
          <LearnLanguageSection />
        </div>
      </div>
      
      {/* section 3 */}
      <div className="min-h-screen py-10 text-white">
        <div className="w-11/12 mx-auto">
          <InstructorSection />

          <h2 className="my-20 text-4xl font-semibold text-center">Reviews from other learners</h2>
          {/* review slider here */}
        </div>
      </div>

      {/* footer section */}
      <div className="h-screen bg-black">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
