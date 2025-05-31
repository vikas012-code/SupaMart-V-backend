import express from "express";
import {AllProductList,AddProduct,GetProductById,UpdateQuantityByOrder,UpdateQuantityByAdding} from "../controller/product.controller.js"

const route = express.Router()

// app.get("/product", async (req,res)=>{
//   const data = await Product.find({})
//   res.json(data)
// })

route.get("/", AllProductList)

route.post("/",AddProduct)

route.get("/getproductbyid",GetProductById)

route.patch("/UpdateQuantityByOrder",UpdateQuantityByOrder)

route.patch("/UpdateQuantityByAdding",UpdateQuantityByAdding)



export default route;