import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:4000/auth/google`
  }

  const handleGithubLogin = () => {
    window.location.href = `http://localhost:4000/auth/github`
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      {/* Email */}
      <label className="w-full">
        <p className="mb-1 text-sm text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
        />
      </label>

      {/* Password */}
      <label className="relative">
        <p className="mb-1 text-sm text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-lg bg-richblack-800 p-3 pr-12 text-richblack-5"
        />

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={22} />
          ) : (
            <AiOutlineEye size={22} />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>

      {/* Sign In */}
      <button
        type="submit"
        className="mt-4 rounded-lg bg-yellow-50 py-2 px-4 font-medium text-richblack-900"
      >
        Sign In
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-3">
        <div className="h-[1px] flex-1 bg-richblack-700" />
        <p className="text-richblack-400 text-sm">OR</p>
        <div className="h-[1px] flex-1 bg-richblack-700" />
      </div>

      {/* OAuth Icons */}
      <div className="flex justify-center gap-6">
        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="p-3 rounded-full bg-richblack-800 hover:bg-richblack-700 transition-all"
        >
          <FcGoogle size={24} />
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={handleGithubLogin}
          className="p-3 rounded-full bg-richblack-800 hover:bg-richblack-700 transition-all"
        >
          <FaGithub size={24} />
        </button>
      </div>

      {/* Note */}
      <p className="text-xs text-richblack-400 text-center mt-2">
        * OAuth signup creates a Student account by default.
      </p>
    </form>
  )
}

export default LoginForm