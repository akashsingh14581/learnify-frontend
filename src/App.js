import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

// 🔥 import your function
import { getUserDetails } from "./services/operations/profileAPI";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 MAIN FIX (user restore on refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
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
        <Route path="/contact" element={<Contact />} />

        {/* 🔥 Protected Routes */}
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
        </Route>

        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;