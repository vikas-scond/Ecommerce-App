import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "./../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle submit of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is Created`);
        getAllCategory();
        setName("");
      } else {
        console.log(data.message);
        toast.error("Error in form submit for geting data from backend");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in handling submit of Category input form");
    }
  };

  // Updating Category
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      if (data?.success) {
        toast.success(`Succesfully Updated name to ${updatedName}`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
      else {
        toast.error("Backend dos't given value in updating catgeory");
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Error in updating handle");
    }
  }

  // Delete Category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
      if (data?.success) {
        toast.success(`Succesfully Deleted the`);
        getAllCategory();
      }
      else {
        toast.error("Backend dos't given delte the particular category");
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Error in Delete handle");
    }
  }
  // Get All Cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      // console.log("hello");
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
        console.log(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Mangage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" colSpan="2" className="text-center">
                      Action
                    </th>
                    {/* <th scope="col"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => {
                    return (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary m-1"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c)
                            }}
                          >
                            Edit Category
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger m-1" onClick={() => {
                            handleDelete(c._id)
                          }}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => {
                setVisible(false);
              }}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdateSubmit}
              ></CategoryForm>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
