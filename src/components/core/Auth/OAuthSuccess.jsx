import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken } from "../../../slices/authSlice";
import { getUserDetails } from "../../../services/operations/profileAPI";

function OAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const token = searchParams.get("token");

      if (!token || token === "undefined") {
        navigate("/login");
        return;
      }

      try {
        // ✅ Save token properly
        localStorage.setItem("token", token);
        dispatch(setToken(token));

        // ✅ Wait for user details to load
        await dispatch(getUserDetails(token, navigate));

        // ✅ Navigate after data is ready
        navigate("/dashboard/my-profile");
      } catch (error) {
        console.log("OAuth Error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    handleOAuthLogin();
  }, [dispatch, navigate, searchParams]);

  return <div>Logging you in...</div>;
}

export default OAuthSuccess;