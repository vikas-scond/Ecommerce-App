import React from "react";
import Layout from "../../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-3 ">
          <img
            src="/images/contactUs.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center" id="contact-title">CONTACT US</h1>
          <p className="text-justify mt-2">
            We Believe in Customer Satisfaction. Any Querry or issue are resolved with 48hours
          </p>
          <p className="mt-3">
            <BiMailSend /> : Email: contact@vikasEcomerce.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : (+91)3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-XXXX-XXXX (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
