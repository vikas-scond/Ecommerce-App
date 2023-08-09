import React from "react";
import Layout from "../../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="privacyBlock">
        <h1>Privacy Policy:</h1>
        <p>
          At Our Ecommerce App, we are committed to protecting your privacy and
          safeguarding your personal information. This Privacy Policy outlines
          how we collect, use, disclose, and protect your data when you use our
          app. We encourage you to read this policy carefully to understand how
          we handle your information.
        </p>
        <h3>Information Collection:</h3>
        <ul>
          <li>
            When you create an account or make a purchase, we may collect
            personal information such as your name, email address, contact
            details, and billing information.
          </li>
          <li>
            We also gather non-personal information such as your device
            information, IP address, and browsing behavior to enhance your app
            experience.
          </li>
        </ul>
        <h3>Information Usage:</h3>
        <ul>
          <li>
            We use your personal information to process your orders, provide
            customer support, and deliver a personalized shopping experience.
          </li>
          <li>
            Your non-personal information helps us analyze app performance,
            improve our services, and enhance app security.
          </li>
        </ul>
        <h3>Information Sharing:</h3>
        <ul>
          <li>
            We do not sell, rent, or lease your personal information to third
            parties for marketing purposes.
          </li>
          <li>
            We may disclose your information if required by law, to protect our
            rights and safety, or to prevent fraud or illegal activities.
          </li>
        </ul>
        <h4>
          By using Our Ecommerce App, you consent to the collection, use, and
          disclosure of your information as described in this Privacy Policy. If
          you have any questions or concerns about our privacy practices, please
          contact our customer support.
        </h4>
      </div>
    </Layout>
  );
};

export default Policy;
