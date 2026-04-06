import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmText, setConfirmText] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleDeleteAccount() {
    if (confirmText !== "DELETE") return

    try {
      setLoading(true)
      await dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-10 flex gap-6 rounded-md border border-pink-700 bg-pink-900 p-8 px-12">

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">

        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>

        <p className="max-w-xl text-pink-100 text-sm">
          This action is <span className="font-bold">permanent</span>. 
          All your data, including purchased courses, will be deleted.
        </p>

        {/* Confirm Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-pink-200">
            Type <span className="font-bold">DELETE</span> to confirm
          </label>

          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE"
            className="form-style max-w-xs"
          />
        </div>

        {/* Button */}
        <button
          type="button"
          disabled={confirmText !== "DELETE" || loading}
          onClick={handleDeleteAccount}
          className={`w-fit px-5 py-2 rounded-md font-semibold transition-all
            ${
              confirmText === "DELETE"
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-pink-300 text-pink-900 cursor-not-allowed"
            }`}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>

      </div>
    </div>
  )
}