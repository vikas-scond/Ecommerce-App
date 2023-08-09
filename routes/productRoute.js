import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Get Products
router.get("/get-product", getProductController);
// Single Products
router.get("/get-product/:slug", getSingleProductController);
// Get Photo
router.get("/product-photo/:pid", productPhotoController);
// delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  deleteProductController
);

// Filter Product
router.post("/product-filters", productFilterController);

// Product Count
router.get("/product-count", productCountController);

// Product Per Page
router.get("/product-list/:page", productListController);

// Search  Product
router.get("/search/:keyword", searchProductController);

// Similar Porduct
router.get('/related-product/:pid/:cid', relatedProductController);

//payments routes
//token
router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;
