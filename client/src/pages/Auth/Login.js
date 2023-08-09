import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

import axios from "axios";
const Login = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      // console.log(res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
        <h4 id="title">Login Page</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              placeholder="Email"
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
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              name="password"
              autoComplete="on"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/forget-password");
            }}
          >
            Forget Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
