import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Proile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  //State
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setName(name);
    setEamil(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user])
  // form Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data.error);
      }
      else {
        setAuth({ ...auth,user:data?.updatedUser })
        let ls=localStorage.getItem('auth');
        ls=JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem('auth',JSON.stringify(ls));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong with Update Profile");
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
      <div className="container-fluid m-3 p-3">
        <div className="row">

          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-7">
            <div className="form-container">
              <h4 id="title">Update Page</h4>
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
                    disabled
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
                    
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Proile;
