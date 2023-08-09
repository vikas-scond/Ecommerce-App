import React from "react";
import Layout from "./../../components/Layout/Layout";
import { useSearch } from "../../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          {/* <h1 className='mt-4'>Search Results</h1> */}
          {/* <pre>{JSON.stringify(values, null, 4)}</pre>
          <h6>{values?.results.length}</h6> */}
          {values?.results.length > 0 ? <h1 className='mt-4'>Search Results</h1> : <h1 className='mt-4'>No Result Found</h1>}
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((product) => {
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
                    <button className="btn btn-primary ms-1 spclbtn">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1 spclbtn">
                      ADD To CART{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
