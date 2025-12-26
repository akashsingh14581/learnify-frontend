import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { getPasswordResetToken } from "../services/operations/authAPI";
function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.loading || {});
  const dispatch = useDispatch();
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent))
  }
  return (
    <div className="flex items-center justify-center p-10 m-auto text-white min-w-[300px] max-w-[40%] h-fit ">
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          <h1 className="text-4xl">{!emailSent ? "Reset Your Password" : "Check Your Email"}</h1>
          <p>
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We've sent the Reset Email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="flex flex-col gap-5">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address *</p>{" "}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}

            <button>{!emailSent ? "Reset Password" : "Resend Email"}</button>
          </form>

          <div>
            <Link to="/login" className="flex items-center">
              <FaArrowLeft />
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
