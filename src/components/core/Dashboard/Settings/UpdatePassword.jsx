import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/iconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const newPassword = watch("newPassword")

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>

      <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        
        <h2 className="text-lg font-semibold text-richblack-5">
          Update Password
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row">

          {/* Old Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="label-style">
              Current Password *
            </label>

            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style pr-10"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
            />

            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>

            {errors.oldPassword && (
              <p className="error-text">{errors.oldPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="label-style">
              New Password *
            </label>

            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style pr-10"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />

            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>

            {errors.newPassword && (
              <p className="error-text">{errors.newPassword.message}</p>
            )}
          </div>

        </div>

        {/* Confirm Password */}
        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="confirmPassword" className="label-style">
            Confirm Password *
          </label>

          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password"
            className="form-style pr-10"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />

          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </span>

          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 px-5 py-2 font-medium hover:bg-richblack-600"
        >
          Cancel
        </button>

        <IconBtn
          type="submit"
          text={isSubmitting ? "Updating..." : "Update Password"}
          disabled={isSubmitting}
        />

      </div>

    </form>
  )
}