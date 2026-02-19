import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
  <form
  onSubmit={handleSubmit(submitContactForm)}
>
  <div className="flex flex-col gap-8">

    {/* First & Last Name */}
    <div className="flex flex-col gap-5 sm:flex-row">
      {/* First Name */}
      <div className="flex flex-col w-full">
        <label htmlFor="firstname" className="mb-1 text-sm text-richblack-400">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          placeholder="Enter first name"
          className="p-3 rounded-md text-black"
          {...register("firstname", { required: true })}
        />
        {errors.firstname && (
          <span className="text-xs text-red-400 mt-1 text-blue-500">
            Please enter your name
          </span>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col w-full">
        <label htmlFor="lastname" className="mb-1 text-sm text-richblack-400">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          placeholder="Enter last name"
          className="p-3 rounded-md text-black"
          {...register("lastname")}
        />
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 text-sm text-richblack-400">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter email address"
        className="p-3 rounded-md text-black"
        {...register("email", { required: true })}
      />
      {errors.email && (
        <span className="text-xs text-red-400 mt-1 text-blue-500">
          Please enter your email address
        </span>
      )}
    </div>

    {/* Phone Number */}
    <div className="flex flex-col">
      <label htmlFor="phonenumber" className="mb-1 text-sm text-richblack-400">
        Phone Number
      </label>

      <div className="flex gap-2">
        <select
          className="p-3 rounded-md bg-yellow-50 w-[90px]"
          {...register("countrycode", { required: true })}
        >
          {CountryCode.map((element, index) => (
            <option key={index} value={element.code}>
              {element.code} - {element.country}
            </option>
          ))}
        </select>

        <input
          type="number"
          id="phonenumber"
          placeholder="12345 67890"
          className="flex-1 p-3 rounded-md text-black"
          {...register("phoneNo", {
            required: { value: true, message: "Please enter phone number" },
            maxLength: { value: 10, message: "Invalid phone number" },
            minLength: { value: 8, message: "Invalid phone number" },
          })}
        />
      </div>

      {errors.phoneNo && (
        <span className="text-xs text-red-400 mt-1 text-blue-500">
          {errors.phoneNo.message}
        </span>
      )}
    </div>

    {/* Message */}
    <div className="flex flex-col">
      <label htmlFor="message" className="mb-1 text-sm text-richblack-400">
        Message
      </label>
      <textarea
        id="message"
        rows="6"
        placeholder="Enter your message here"
        className="p-3 rounded-md text-black resize-none"
        {...register("message", { required: true })}
      />
      {errors.message && (
        <span className="text-xs text-red-400 mt-1 text-blue-500">
          Please enter your message
        </span>
      )}
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={loading}
      className="mt-4 rounded-md bg-yellow-50 py-3 text-[16px] font-bold text-black hover:bg-yellow-100 transition-all"
    >
      {loading ? "Sending..." : "Send Message"}
    </button>

  </div>
</form>

  )
}

export default ContactUsForm
