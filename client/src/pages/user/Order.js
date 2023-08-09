import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from 'moment';

const Order = () => {
  const [orders, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      console.log(data);
      setOrder(data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrders();
  }, [auth?.token])
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All Orders</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Orders Date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>

                {orders?.map((order, ind) => {
                  console.log(order);
                  return (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow() }</td>
                      <td>{order?.payment.success ? "Succes" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
