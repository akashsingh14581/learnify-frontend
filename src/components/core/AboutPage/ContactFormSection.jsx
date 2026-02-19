import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-[90%] max-w-[600px] lg:max-w-[50%] py-10">

      
      <h1 className="text-3xl font-semibold text-white mb-2">
        Get in Touch
      </h1>

      <p className="text-richblack-300 mb-8">
        We'd love to hear from you. Please fill out this form.
      </p>

      <ContactUsForm />
      
    </div>
  );
};

export default ContactFormSection;
