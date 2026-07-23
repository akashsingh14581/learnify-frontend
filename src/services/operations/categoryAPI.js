import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { categories, catalogData } from "../apis"

// ================ fetch all categories ================
export const getAllCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", categories.CATEGORIES_API)
    result = response?.data?.allCategory || []
  } catch (error) {
    console.log("GET_ALL_CATEGORIES_API ERROR............", error)
  }
  return result
}

// ================ fetch catalog page data for one category ================
export const getCatalogPageData = async (categoryId) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Category page data")
    }
    result = response?.data
  } catch (error) {
    console.log("CATALOG_PAGE_DATA_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
