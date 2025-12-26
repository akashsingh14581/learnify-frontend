import React from "react";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "./Button";
// import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
function CodeBlock({
  position,
  heading,
  subheading,
  ctbtn1,
  ctbtn2,
  codeblock,
  bgGradient,
  codeColor,
}) {
  return (
    <div>
        {/* section 1 */}
      <div
        className={`lg:h-[300px] max-h-fit w-full flex ${position} my-20 justify-between gap-10 flex-col lg:flex-row`}
      >
        {/* left part */}
        <div className="flex flex-col w-full gap-8 lg:flex-1">
          {heading}
          <div className="font-bold text-richblack-300">{subheading}</div>

          <div className="flex mt-4 gap-7">
            <CTAButton active={ctbtn1.active} linkedTo={ctbtn1.linkTo}>
              <div className="flex items-center gap-2">
                {ctbtn1.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={ctbtn2.active} linkedTo={ctbtn2.linkTo}>
              {ctbtn1.btnText}
            </CTAButton>
          </div>
        </div>

        {/* right code part */}
        <div className="flex w-full gap-2 lg:flex-1">
          {/* hw bg gradient */}

          <div className="w-[5%] lg:w-[10%] text-center text-richblack-400 font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
          </div>
          <div
            className={`rounded-lg p-4 bg-gradient-to-tr from-richblack-800 via-richblack-900 to-richblack-800 text-blue-400 w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 text-[14px]`}
          >
            <TypeAnimation
              style={{ display: "block", whiteSpace: "pre-line" }}
              sequence={[codeblock, 2000, ""]}
              omitDeletionAnimation={true}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div
        className={`lg:h-[300px] max-h-fit w-full flex ${position} my-20 justify-between gap-10 flex-col lg:flex-row-reverse `}
      >
        {/* left part */}
        <div className="flex flex-col w-full gap-8 lg:flex-1">
          {heading}
          <div className="font-bold text-richblack-300">{subheading}</div>

          <div className="flex mt-4 gap-7">
            <CTAButton active={ctbtn1.active} linkedTo={ctbtn1.linkTo}>
              <div className="flex items-center gap-2">
                {ctbtn1.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={ctbtn2.active} linkedTo={ctbtn2.linkTo}>
              {ctbtn1.btnText}
            </CTAButton>
          </div>
        </div>

        {/* right code part */}
        <div className="flex w-full gap-2 lg:flex-1">
          {/* hw bg gradient */}

          <div className="w-[5%] lg:w-[10%] text-center text-richblack-400 font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
          </div>
          <div
            className={`rounded-lg p-4 bg-gradient-to-tr from-richblack-800 via-richblack-900 to-richblack-800 text-yellow-50 w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 text-[14px]`}
          >
            <TypeAnimation
              style={{ display: "block", whiteSpace: "pre-line" }}
              sequence={[codeblock, 2000, ""]}
              omitDeletionAnimation={true}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
