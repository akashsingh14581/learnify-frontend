import { apiConnector } from "../apiconnector"
import { ratingsEndpoints } from "../apis"

const { REVIEWS_DETAILS_API } = ratingsEndpoints

// ================ fetch all ratings and reviews across every course ================
export const getAllReviews = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", REVIEWS_DETAILS_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Reviews")
    }
    result = response?.data?.data || []
  } catch (error) {
    console.log("GET_ALL_REVIEWS_API ERROR............", error)
  }
  return result
}
