import React from "react";
import Layout from "../../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-4 ">
          <img
            src="/images/AboutUs.jpg"
            alt="about us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <div className="text-justify">
            <h1>Welcome to Our Ecommerce App!  </h1>
            <p>At Our Ecommerce App, we believe in
              bringing convenience and joy to your online shopping experience.
              With a vast selection of products, seamless navigation, and
              excellent customer service, we strive to be your go-to destination
              for all your shopping needs.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
