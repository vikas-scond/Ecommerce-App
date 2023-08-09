import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  // Geting All Category List
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      console.log("hello");
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // Create Product Function
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('shipping', shipping);
      productData.append('photo', photo);
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
      if (data?.success) {
        toast.success("Successfully Created the Product");
      }
      else {
        console.log(data);
        toast.error("Error in sending data to create new product");
      }
      navigate('/dashboard/admin/products');
    }
    catch (error) {
      console.log(error);
      toast.error("Error in Creating Product");
    }
  }
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((catg) => {
                  return (
                    <Option key={catg._id} value={catg._id}>
                      {catg.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product"
                    height={"200px"}
                    className=""
                  />
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                ></input>
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a Description"
                  className="form-control"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                ></input>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                ></input>
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder='Select Shipping'
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value)
                  }}
                >
                  <Option value='0'>No</Option>
                  <Option value='1'>Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
