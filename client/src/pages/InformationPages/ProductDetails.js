import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProducts] = useState([]);
  const [catName, SetCatName] = useState("");
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      SetCatName(data.product.category.name);
      getRelatedPorduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Products
  const getRelatedPorduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      // console.log(data.products);
      setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // intial
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout >
      {/* <h1>Hello</h1>
      <pre>{JSON.stringify(product, null, 4)}</pre> */}

      <div className="row container mt-4">
        <div className="col-md-5">
          {product?._id && (
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              className="card-img-top"
              alt={product.name}
              height="400"
            />
          )}
        </div>
        <div className="col-md-5">
          <h1 className="text-center">Product Details</h1>
          <h5>Name: {product.name}</h5>
          <h5>Desription: {product.description}</h5>
          <h5>Price: {product.price}</h5>
          <h5>Category: {catName}</h5>
          <button className="btn btn-secondary ms-1 spclbtn">
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row ms-3 container">
        <h6> Similar Products </h6>
        {relatedProduct.length < 1 && <p className="text-center">No Similar Product Found</p>}
        <div className="d-flex flex-wrap">
          {relatedProduct?.map((pro) => {
            return (
              <div
                className="card m-2"
                style={{ width: "16.5rem" }}
                key={pro._id}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pro._id}`}
                  className="card-img-top"
                  alt={pro.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{pro.name}</h5>
                  <p className="card-text">
                    {pro.description.substring(0, 50)}...
                  </p>
                  <p className="card-text">₹ {pro.price}</p>
                  <button className="btn btn-secondary ms-1 spclbtn">
                    ADD To CART{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* <pre>{JSON.stringify(product.category, null, 4)}</pre> */}
      </div>
    </Layout>
  );
};

export default ProductDetails;
