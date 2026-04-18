import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
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

  // ✅ OAuth handlers (env based)
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:4000/auth/google`
  }

  const handleGithubLogin = () => {
    window.location.href = `http://localhost:4000/auth/github`
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        
        {/* Name */}
        <div className="flex gap-x-4">
          <input
            required
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="First name"
            className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
          />
          <input
            required
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Last name"
            className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
          />
        </div>

        {/* Email */}
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Email address"
          className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
        />

        {/* Passwords */}
        <div className="flex gap-x-4">
          <div className="relative w-full">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full rounded-lg bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          <div className="relative w-full">
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
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 rounded-lg bg-yellow-50 py-2 px-4 font-medium text-richblack-900"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-3">
          <div className="h-[1px] flex-1 bg-richblack-700" />
          <p className="text-sm text-richblack-400">OR</p>
          <div className="h-[1px] flex-1 bg-richblack-700" />
        </div>

        {/* OAuth Icons */}
        <div className="flex justify-center gap-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="p-3 rounded-full bg-richblack-800 hover:bg-richblack-700 transition-all"
            title="Sign up with Google"
          >
            <FcGoogle size={24} />
          </button>

          <button
            type="button"
            onClick={handleGithubLogin}
            className="p-3 rounded-full bg-richblack-800 hover:bg-richblack-700 transition-all"
            title="Sign up with GitHub"
          >
            <FaGithub size={24} />
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-richblack-400 text-center mt-2">
          * OAuth signup creates a Student account by default.
        </p>
      </form>
    </div>
  )
}

export default SignupForm