import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { contactusEndpoint } from "../apis"

export async function submitContactForm(data) {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector(
      "POST",
      contactusEndpoint.CONTACT_US_API,
      data
    )
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong")
    }
    toast.success("Message sent successfully")
    success = true
  } catch (error) {
    console.log("CONTACT_US_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Send Message")
  }
  toast.dismiss(toastId)
  return success
}
