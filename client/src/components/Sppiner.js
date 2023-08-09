import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Sppiner = ({ link = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`/${link}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, link]);
  return (
    <>
      <div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <h1 className="Text-center">Redirecting you in {count} Seconds</h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sppiner;
