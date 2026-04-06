import { useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const [error, setError] = useState("")

  const fileInputRef = useRef(null)

  const handleClick = () => fileInputRef.current.click()

  // ✅ File Validation
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Type check
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      setError("Only JPG, PNG, GIF allowed")
      return
    }

    // Size check (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB")
      return
    }

    setError("")
    setImageFile(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setPreviewSource(reader.result)
  }

  const handleFileUpload = async () => {
    if (!imageFile) {
      setError("Please select an image first")
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      await dispatch(updateDisplayPicture(token, formData))
    } catch (err) {
      setError("Upload failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 text-richblack-5">

      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4">
        Change Profile Picture
      </h2>

      <div className="flex flex-col md:flex-row md:items-center gap-6">

        {/* Image Preview */}
        <img
          src={previewSource || user?.imageUrl}
          alt={`profile-${user?.firstName}`}
          className="h-20 w-20 rounded-full object-cover"
        />

        {/* Controls */}
        <div className="flex flex-col gap-2">

          {/* Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            aria-label="Upload profile picture"
          />

          {/* Buttons */}
          <div className="flex gap-3">

            <button
              onClick={handleClick}
              disabled={loading}
              className="rounded-md bg-richblack-700 px-4 py-2 text-sm font-medium hover:bg-richblack-600 disabled:opacity-50"
            >
              Select Image
            </button>

            <button
              onClick={handleFileUpload}
              disabled={loading || !imageFile}
              className="flex items-center gap-2 rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-100 disabled:opacity-50"
            >
              <FiUpload />
              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-pink-200">
              {error}
            </p>
          )}

        </div>
      </div>
    </div>
  )
}