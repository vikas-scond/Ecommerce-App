import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import { Console } from "console";
import braintree from "braintree";
import orderModel from '../models/orderModel.js';

import dotenv from "dotenv";
dotenv.config();
// Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation that all fields are present or not
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required",
        });
      case !description:
        return res.status(500).send({
          error: "Description is Required",
        });
      case !price:
        return res.status(500).send({
          error: "Price is Required",
        });
      case !category:
        return res.status(500).send({
          error: "Category is Required",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is Required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Phot is required and should be less than 1MB",
        });
    }
    const products = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Product Controller",
      error,
    });
  }
};

// Get All products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "First 12 product are here",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get product controller",
      error: error.message,
    });
  }
};

// Get Single Product
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");

    // Need to update if we get nothing then what to show
    // if (!product) {
    //   return res.send(500).send({
    //     success: false,
    //     message: "No such product exist",
    //   });
    // }
    res.status(200).send({
      success: true,
      message: "Successfully get product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting one product in controller",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productModel.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    // res.status(200).send({
    //   success: true,
    //   message: "Successfuly get image of products",
    //   Product,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting photo from controller",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "successfuly deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// Update Product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation that all fields are present or not
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required",
        });
      case !description:
        return res.status(500).send({
          error: "Description is Required",
        });
      case !price:
        return res.status(500).send({
          error: "Price is Required",
        });
      case !category:
        return res.status(500).send({
          error: "Category is Required",
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is Required",
        });
      case photo && photo.size > 102400:
        return res.status(500).send({
          error: "Photo is required and should be less than 1MB",
        });
    }
    console.log(req.params.pid);
    console.log(photo);
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Product Controller",
      error,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      console.log("Doing for cat");
      args.category = checked;
    }
    // console.log(checked.length);
    // console.log(checked.length>0);
    if (radio.length > 0) {
      console.log("Adding price");
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args);
    console.log("Filtering Products");
    // if(radio.length>0){
    //   console.log("E");
    //   products.filter((pro) => {
    //     console.log(pro.price >= radio.price[0] && pro.price <= radio.price[1]);
    //     return pro.price >= radio.price[0] && pro.price <= radio.price[1];
    //   });
    // }
    products.map((pro) => {
      console.log(
        pro.name + " " + pro.price + " OR Pric " + radio[0] + " " + radio[1]
      );
    });
    res.status(200).send({
      success: true,
      message: "Successfully get Filtered Product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Product",
      error,
    });
  }
};

// Product Count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Product Count Controller",
      error,
    });
  }
};

//Product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Successfull geting page list Controler ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Product List Controller",
      error,
    });
  }
};

// Search Product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search APi",
      error,
    });
  }
};

// Simlair Products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Successfully done related products",
      products,
    });
  } catch (error) {
    Console.log(error);
    res.status(400).send({
      success: false,
    });
  }
};

// Payment Gateway API
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      // console.log("Token gatekwy");
      // console.log(err+" "+response);
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send({response:response});
      }

    })
  }
  catch (error) {
    console.log(error);
  }
}

// Payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map(i => { total += i.price });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true
        }

      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id
          }).save();
          res.json({ ok: true });
        }
        else {
          console.log(error);
          res.status(500).send(error)
        }
      }
    )
  }
  catch (error) {
    console.log(error);

  }
}