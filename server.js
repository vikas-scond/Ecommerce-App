import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
// configure env
dotenv.config();

// Connect server
connectDb();

// rest Object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// // Api For Intial Testing Setup
// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

// PORT
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
