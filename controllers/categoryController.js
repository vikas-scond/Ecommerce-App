import e from "express";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// Create Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is not present of Category",
      });
    }
    const existingCatregory = await categoryModel.findOne({ name });
    if (existingCatregory) {
      return res.status(200).send({
        success: true,
        message: "Already a category",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "successfull Created new Categroy",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category Controller",
    });
  }
};

//Update Category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Category",
    });
  }
};

// for geting all category
export const categoryContoller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting all category list",
      error,
    });
  }
};

// Single Cateogry Controller
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Invalid request slug is not present"
      })
    }
    res.status(200).send({
      success: true,
      message: "successfull get category",
      category
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in giting this category",
      error
    })
  }
};

// Delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const element = await categoryModel.findByIdAndDelete(id);
    // console.log(element+" For testing"+id);
    // Here we can improve there is someone exist then only delete
    res.status(200).send({
      success: true,
      message: "successFull delete category if present",
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delte the category",
      error
    })
  }
}