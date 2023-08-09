import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setCategory(data.product.category._id);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      if (data?.product?.shipping) {
        console.log("A");
        setShipping("1");
      } else {
        console.log("B");
        setShipping("0");
      }
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // Create Product Function
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Successfully Update the Product");
        navigate("/dashboard/admin/products");
      } else {
        console.log(data);
        toast.error("Error in sending data to update  product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Updating Product");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are u serious to delete plz write yes or no only any other will be treated as yes"
      );
      if (!answer || answer === "no") {
        return;
      }
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      console.log(data);
      if (data?.success) {
        toast.success("Successfully Created the Product");
        navigate("/dashboard/admin/products");
      } else {
        console.log(data);
        toast.error(
          "Error  or more waiting for repsonse  in delteing the product"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleig the product ");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Update Product</h1>
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
                value={category}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
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
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    // console.log("See  brom ");
                    // console.log(value);
                    setShipping(value);
                  }}
                  value={shipping === "1" ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleDelete}>
                  Delte PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
