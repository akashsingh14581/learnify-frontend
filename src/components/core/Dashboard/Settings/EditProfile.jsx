import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      dateOfBirth: user?.additionalDetails?.dateOfBirth,
      gender: user?.additionalDetails?.gender,
      contactNumber: user?.additionalDetails?.contactNumber,
      about: user?.additionalDetails?.about,
    },
  })

  const submitProfileForm = async (data) => {
    try {
      await dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>

      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 flex flex-col gap-6">

        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="label-style">
              First Name *
            </label>
            <input
              id="firstName"
              className="form-style"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <p className="error-text">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="label-style">
              Last Name *
            </label>
            <input
              id="lastName"
              className="form-style"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName && (
              <p className="error-text">{errors.lastName.message}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label htmlFor="dateOfBirth" className="label-style">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              className="form-style"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date cannot be in future",
                },
              })}
            />
            {errors.dateOfBirth && (
              <p className="error-text">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="label-style">
              Gender *
            </label>
            <select
              id="gender"
              className="form-style"
              {...register("gender", {
                required: "Please select gender",
              })}
            >
              <option value="">Select gender</option>
              {genders.map((g, i) => (
                <option key={i} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="error-text">{errors.gender.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contactNumber" className="label-style">
              Contact Number *
            </label>
            <input
              id="contactNumber"
              className="form-style"
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
              })}
            />
            {errors.contactNumber && (
              <p className="error-text">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* About */}
          <div>
            <label htmlFor="about" className="label-style">
              About *
            </label>
            <input
              id="about"
              className="form-style"
              {...register("about", {
                required: "About is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              })}
            />
            {errors.about && (
              <p className="error-text">{errors.about.message}</p>
            )}
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 px-5 py-2 font-medium hover:bg-richblack-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 hover:bg-yellow-100 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </form>
  )
}