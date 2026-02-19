import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6"
import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const { loading } = useSelector((state) => state.auth || {})
  const dispatch = useDispatch()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-richblack-900 sm:p-8">

          {/* Heading */}
          <h1 className="text-2xl font-semibold sm:text-3xl text-richblack-5">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm sm:text-base text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We've sent the reset email to `}
            {emailSent && (
              <span className="font-medium text-yellow-50"> {email}</span>
            )}
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="mt-6 space-y-5">
            {!emailSent && (
              <div>
                <label className="text-sm text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 mt-1 transition-all rounded-lg outline-none bg-richblack-800 text-richblack-5 focus:ring-2 focus:ring-yellow-50"
                />
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 font-medium transition rounded-lg bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm text-richblack-200 hover:text-richblack-5"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
