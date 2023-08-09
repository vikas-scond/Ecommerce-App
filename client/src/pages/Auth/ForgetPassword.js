import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const ForgetPassword = () => {
  const [email, setEamil] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forget-password`,
        { email, answer, newPassword }
      );
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Wrong Credentials");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <h4 id="title">Reset Password</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              placeholder="Enter Your Email"
              onChange={(event) => {
                setEamil(event.target.value);
              }}
              type="email"
              className="form-control"
              id="exampleInputEmail"
              value={email}
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Enter Your Best Friend Name"
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputEmail"
              value={answer}
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Enter Your new Password"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={newPassword}
              name="password"
              autoComplete="on"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
