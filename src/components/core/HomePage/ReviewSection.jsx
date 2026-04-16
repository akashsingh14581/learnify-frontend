import React from "react"
import { FaStar } from "react-icons/fa"

const reviews = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Learnify helped me go from tutorial-watcher to building real projects. The structure is insanely practical.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The projects and mentorship style made learning much easier than random YouTube tutorials.",
    rating: 5,
  },
  {
    id: 3,
    name: "Aman Gupta",
    role: "MERN Stack Developer",
    image: "https://i.pravatar.cc/150?img=14",
    review:
      "Clean roadmap, practical content, and great UI. It actually feels like a premium platform.",
    rating: 4,
  },
]

function ReviewSection() {
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex animate-marquee gap-6 w-max">
        {duplicatedReviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[350px] max-w-[350px] p-6 rounded-xl bg-richblack-800 border border-richblack-700 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />

              <div className="min-w-0">
                <h4 className="font-semibold text-lg text-white truncate">
                  {review.name}
                </h4>
                <p className="text-sm text-richblack-300 truncate">
                  {review.role}
                </p>
              </div>
            </div>

            <p className="text-richblack-300 text-sm leading-6 mb-4">
              "{review.review}"
            </p>

            <div className="flex gap-1 text-yellow-50">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSection