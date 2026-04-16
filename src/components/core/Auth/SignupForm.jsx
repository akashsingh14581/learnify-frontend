import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google"
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
            />
          </label>

          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
            />
          </label>
        </div>

        <label>
          <p className="mb-1 text-sm text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
          />
        </label>

        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-lg bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye size={22} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-lg bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={22} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye size={22} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg bg-yellow-50 py-2 px-4 font-medium text-richblack-900"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-[1px] flex-1 bg-richblack-700" />
          <p className="text-sm text-richblack-400">OR</p>
          <div className="h-[1px] flex-1 bg-richblack-700" />
        </div>

        {/* Google Button */}
       <button
  type="button"
  onClick={handleGoogleLogin}
  className="flex items-center justify-center gap-3 rounded-lg border border-richblack-700 bg-richblack-800 py-3 px-4 font-medium text-richblack-5 hover:bg-richblack-700 transition-all"
>
  <FcGoogle size={22} />
  Continue with Google
</button>

<p className="text-xs text-richblack-400 text-center mt-2">
  * Signing up with Google will create a Student account by default.
</p>
      </form>
    </div>
  )
}

export default SignupForm