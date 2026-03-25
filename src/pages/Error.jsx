import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-richblack-900 text-white px-4">
      
      {/* Big 404 */}
      <h1 className="text-8xl font-bold text-yellow-50 mb-4">404</h1>

      {/* Message */}
      <p className="text-2xl font-semibold mb-2">
        Oops! Page Not Found
      </p>

      <p className="text-richblack-300 mb-6 text-center max-w-md">
        The page you are looking for might have been removed or does not exist.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg font-semibold hover:scale-95 transition-all duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;