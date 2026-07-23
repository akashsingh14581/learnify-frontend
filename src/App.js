import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Setting from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import OAuthSuccess from "./components/core/Auth/OAuthSuccess";

import { getUserDetails } from "./services/operations/profileAPI";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import InstructorCourses from "./components/core/Dashboard/InstructorCourses";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  // ✅ Restore user on refresh (FIXED)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch, navigate]); // ✅ dependency added

  return (
    <div className="flex flex-col w-screen min-h-screen bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />
          <Route
            path="dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />

          {/* ✅ Student Routes */}
          <Route
            path="dashboard/cart"
            element={
              user?.accountType === ACCOUNT_TYPE.STUDENT ? (
                <Cart />
              ) : (
                <Error />
              )
            }
          />
          <Route
            path="dashboard/purchase-history"
            element={
              user?.accountType === ACCOUNT_TYPE.STUDENT ? (
                <PurchaseHistory />
              ) : (
                <Error />
              )
            }
          />

          {/* ✅ Instructor Routes */}
          <Route
            path="dashboard/add-course"
            element={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                <AddCourse />
              ) : (
                <Error />
              )
            }
          />
          <Route
            path="dashboard/edit-course/:courseId"
            element={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                <AddCourse />
              ) : (
                <Error />
              )
            }
          />
          <Route
            path="dashboard/my-courses"
            element={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                <InstructorCourses />
              ) : (
                <Error />
              )
            }
          />
          <Route
            path="dashboard/instructor"
            element={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                <InstructorDashboard />
              ) : (
                <Error />
              )
            }
          />
        </Route>

        {/* View Course (video player) - protected, nested route holds the active lecture */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          <Route path="view-course/:courseId" element={<VideoDetails />} />
          <Route
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        </Route>

        {/* OAuth */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Fallback */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;