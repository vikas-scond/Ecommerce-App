import Layout from "../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DropIn from 'braintree-web-drop-in-react';
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  // Total Price calculate
  const totalPriceCalculater = () => {
    try {
      let totalPrice = 0;
      cart.map((product) => {
        return (totalPrice += product.price);
      });
      setTotal(totalPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    totalPriceCalculater();
  });
  // Delete or Remvoe Item from Cart
  const removeCardItem = (id) => {
    try {
      const newCart = cart.filter((product) => {
        if (id === "a" || product._id !== id) {
          return true;
        } else {
          id = "a";
          return false;
        }
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("Removed Item from cart");
      totalPriceCalculater();
    } catch (error) {
      console.log(error);
    }
  };

  // get Payment Gateway Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      // console.log(data.response);
      setClientToken(data?.response?.clientToken);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getToken();
  }, [auth?.token])

  // Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      // console.log("Handling Payment");
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4>
              {cart?.length > 0
                ? `You Have ${cart.length} items in your cart ${auth.token ? "" : " and Please login to checkout"
                }`
                : "Your Cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((product, ind) => {
              return (
                <div className="row mb-2 card flex-row" key={ind}>
                  <div className="col-md-4 mt-2">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      width="100px"
                    />
                  </div>
                  <div className="col-md-8 mt-2">
                    <h4>{product.name}</h4>
                    <p>{product.description.substring(0, 30)}</p>
                    <h4>Price : ₹ {product.price}</h4>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCardItem(product._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <hr />
            <p>Total | Checkout | Payment</p>
            <h4> ₹ {total}</h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn  spclbtn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 ">
                  <button
                    className="btn  spclbtn btn-outline-warning"
                    onClick={() => {
                      navigate("/login", {
                        state: "/cart"
                      });

                    }}
                  >
                    Please Login to Procced Further
                  </button>
                </div>
              </>
            )}
            <div className='mt-2'>
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,

                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary spclbtn"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
