import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Register = () => {
  //hooks
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong with Registration");
    }
    // setName("");
    // setEamil("");
    // setPassword("");
    // setPhone("");
    // setAddress("");
    // console.log(event.target);
    // toast.success("Registered Success");
  };
  return (
    <Layout>
      <div className="form-container">
        <h4 id="title">Register Page</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputName"
              value={name}
              name="name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              placeholder="Phone"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputPhone"
              value={phone}
              name="phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Address"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              value={address}
              name="address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="What is Your Best Friend Name"
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleAnswer"
              value={answer}
              name="address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
