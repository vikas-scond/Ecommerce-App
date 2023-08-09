import React, { useState, useEffect } from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from 'moment';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Proccesing", "Shipped", "delivered", "cancel"]);
    const [changeStatus, setChangeStatus] = useState("");

    const [orders, setOrder] = useState([]);
    const [auth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            console.log(data);
            setOrder(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: value });
            getOrders();
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
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>All orders</h1>
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
                                        <td>
                                            <Select
                                                bordered={false}
                                                onChange={(value) => { handleChange(order._id, value) }}
                                                defaultValue={order.status}
                                            >
                                                {status.map((s, i) => {
                                                    return (<Option key={i} value={s}>{s}</Option>);
                                                })}
                                            </Select>
                                        </td>
                                        <td>{order?.buyer?.name}</td>
                                        <td>{moment(order?.createdAt).fromNow()}</td>
                                        <td>{order?.payment.success ? "Succes" : "Failed"}</td>
                                        <td>{order?.products?.length}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders