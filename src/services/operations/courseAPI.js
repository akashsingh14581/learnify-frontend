import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { courseEndpoints, studentEndpoints } from "../apis"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API,
} = courseEndpoints

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API, PURCHASE_HISTORY_API } =
  studentEndpoints

// ================ get all published courses ================
export async function getAllCourses() {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ================ fetch a single course's details ================
export async function fetchCourseDetails(courseId) {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API ERROR............", error)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}

// ================ create a new course ================
export async function addCourseDetails(data, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Add Course Details")
  }
  toast.dismiss(toastId)
  return result
}

// ================ edit an existing course ================
export async function editCourseDetails(data, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Update Course Details")
  }
  toast.dismiss(toastId)
  return result
}

// ================ create a section ================
export async function createSection(data, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course Section Created")
    result = response?.data?.data?.course
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Create Section")
  }
  toast.dismiss(toastId)
  return result
}

// ================ update a section ================
export async function updateSection(data, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Update Section")
  }
  toast.dismiss(toastId)
  return result
}

// ================ delete a section ================
export async function deleteSection(data, token) {
  let success = false
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course Section Deleted")
    success = true
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Delete Section")
  }
  toast.dismiss(toastId)
  return success
}

// ================ create a subsection ================
export async function createSubSection(data, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture Added")
    result = response?.data?.data?.section
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Add Lecture")
  }
  toast.dismiss(toastId)
  return result
}

// ================ update a subsection ================
export async function updateSubSection(data, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Update Lecture")
  }
  toast.dismiss(toastId)
  return result
}

// ================ delete a subsection ================
export async function deleteSubSection(data, token) {
  let success = false
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture Deleted")
    success = true
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Delete Lecture")
  }
  toast.dismiss(toastId)
  return success
}

// ================ fetch instructor's own courses ================
export async function fetchInstructorCourses(token) {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Fetch Instructor Courses")
  }
  toast.dismiss(toastId)
  return result
}

// ================ delete a course ================
export async function deleteCourse(data, token) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Delete Course")
  }
  toast.dismiss(toastId)
}

// ================ get full course details + watch progress for a logged-in student ================
export async function getFullDetailsOfCourse(courseId, token) {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API ERROR............", error)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}

// ================ mark a lecture as complete ================
export async function markLectureAsComplete(data, token) {
  let result = false
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Update Progress")
  }
  toast.dismiss(toastId)
  return result
}

// ================ create a rating & review for a course ================
export async function createRating(data, token) {
  let success = false
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Review Submitted Successfully")
    success = true
  } catch (error) {
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Submit Review")
  }
  toast.dismiss(toastId)
  return success
}

// ================ get the logged-in student's purchase history ================
export async function getPurchaseHistory(token) {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", PURCHASE_HISTORY_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("PURCHASE_HISTORY_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Fetch Purchase History")
  }
  toast.dismiss(toastId)
  return result
}

// ================ load the Razorpay checkout script ================
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ================ buy the courses currently in cart ================
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...")
  try {
    const scriptLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    )
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Check your internet connection")
      return
    }

    // create order on the backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courseId: courses[0] },
      { Authorization: `Bearer ${token}` }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }

    const { order } = orderResponse.data

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      name: "CodeElevator",
      description: "Course Purchase",
      handler: function (response) {
        sendPaymentSuccessEmail(response, order.amount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
      prefill: {
        name: `${userDetails?.firstName} ${userDetails?.lastName}`,
        email: userDetails?.email,
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed", function () {
      toast.error("Payment Failed")
    })
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Make Payment")
  }
  toast.dismiss(toastId)
}

// ================ confirm payment success email ================
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
  }
}

// ================ verify payment signature and enroll student ================
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful, You are Enrolled in the Course")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Verify Payment")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}
