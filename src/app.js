import connectDB from "./config/database.js";
import express, { json } from "express";
import cors from "cors"
import fileUpload from "express-fileupload";

import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import wishlistsRoutes from "./routes/wishlist.route.js"
import orderRoutes from "./routes/order.route.js"
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true
}))

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  console.log("index connected...")
  res.send({ message: "Hello!!!" });
});

app.use("/user", userRoutes)
app.use("/products", productRoutes)
app.use("/wishlists", wishlistsRoutes)
app.use("/orders", orderRoutes)

export default app;
