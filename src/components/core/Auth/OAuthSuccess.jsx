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
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(setToken(token));
      dispatch(getUserDetails(token, navigate));
      navigate("/dashboard/my-profile");
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams, dispatch]);

  return <div>Logging you in...</div>;
}

export default OAuthSuccess;