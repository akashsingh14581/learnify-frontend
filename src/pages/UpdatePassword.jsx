import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-richblack-900 sm:p-8">
          
          {/* Heading */}
          <h1 className="text-2xl font-semibold sm:text-3xl text-richblack-5">
            Choose new password
          </h1>

          <p className="mt-2 text-sm sm:text-base text-richblack-100">
            Almost done. Enter your new password and you’re all set.
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="mt-6 space-y-5">

            {/* Password */}
            <div>
              <label className="text-sm text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </label>

              <div className="relative mt-1">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter new password"
                  className="w-full p-3 pr-12 transition-all rounded-lg outline-none bg-richblack-800 text-richblack-5 focus:ring-2 focus:ring-yellow-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute -translate-y-1/2 right-3 top-1/2 text-richblack-200"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </label>

              <div className="relative mt-1">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm new password"
                  className="w-full p-3 pr-12 transition-all rounded-lg outline-none bg-richblack-800 text-richblack-5 focus:ring-2 focus:ring-yellow-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute -translate-y-1/2 right-3 top-1/2 text-richblack-200"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 font-medium transition rounded-lg bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm text-richblack-200 hover:text-richblack-5"
            >
              <BiArrowBack />
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
