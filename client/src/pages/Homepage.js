import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/cart';
import { toast } from "react-hot-toast";

const Homepage = () => {
  // const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isfilter, setIsFilter] = useState(false);
  const navigate = useNavigate();

  // hooke for adding to cart
  const [cart, setCart] = useCart();

  // Getting All Categoryies
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      // console.log("hello");
      // console.log(data);
      if (data?.success) {
        setCategories(data?.category);
        // console.log(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadMore();
  }, [page]);

  // Filter by Cat
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => {
        return c !== id;
      });
    }
    setChecked(all);
  };

  // Get Filter Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      console.log(data.products);
      await setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
      setIsFilter(false);
    } else {
      filterProduct();
      setIsFilter(true);
    }
    //eslint-disable-next-line
  }, [checked, radio]);

  return (
    <Layout>
      {/* <h1>Homepage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ms-4">
            {categories?.map((c) => {
              return (
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    console.log(e);
                    handleFilter(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              );
            })}
          </div>

          {/* Filter By Price */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ms-4 ">
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            >
              {Prices?.map((price) => {
                return (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-4 mt-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                // setChecked([]);
                // setRadio([]);
                window.location.reload();
              }}
            >
              Reset...
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* <pre>{JSON.stringify(checked, null, 4)}</pre>
          <pre>{JSON.stringify(radio, null, 4)}</pre> */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => {
              return (
                <div
                  className="card m-2"
                  style={{ width: "16.5rem" }}
                  key={product._id}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description.substring(0, 50)}...
                    </p>
                    <p className="card-text">₹ {product.price}</p>
                    <button
                      className="btn btn-primary ms-1 spclbtn"
                      onClick={() => {
                        navigate(`/product/${product.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1 spclbtn" onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem('cart', JSON.stringify([...cart, product]))
                      toast.success("Added to cart");
                    }}>
                      ADD To CART{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && !isfilter && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
