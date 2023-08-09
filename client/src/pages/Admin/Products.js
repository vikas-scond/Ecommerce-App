import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  // Get All Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      console.log("Prduct");
      console.log(data);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting All Product");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">

        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product</h1>
            <div className="d-flex flex-wrap">
              {products?.map((product) => {
                return (
                  <Link
                    to={`/dashboard/admin/products/${product.slug}`}
                    key={product._id}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
