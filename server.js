import DB_Connection from "./DB_Connection.js";
import express, { json } from "express";
import cors from "cors"

import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import wishlistsRoutes from "./routes/wishlist.route.js"
import orderRoutes from "./routes/order.route.js"

const app = express();

app.use(cors())

DB_Connection();


app.use(express.json())
 

app.get("/",(req, res) => {
  console.log("index connected...")
  res.send({ message: "Hello!!!"});
});

app.use("/user",userRoutes)

app.use("/products", productRoutes)

app.use("/wishlists",wishlistsRoutes)

app.use("/orders",orderRoutes)




app.listen(process.env.PORT, () => {
  
  console.log("server is running",process.env.PORT);

});

