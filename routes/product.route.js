import express from "express";
import {AllProductList,AddProduct,GetProductById,UpdateQuantityByOrder,UpdateQuantityByAdding,UploadImage} from "../controller/product.controller.js"

const route = express.Router()

route.get("/", AllProductList)

route.post("/",AddProduct)

route.post("/uploadimage",UploadImage)

route.get("/:id",GetProductById)

route.patch("/UpdateQuantityByOrder",UpdateQuantityByOrder)

route.patch("/UpdateQuantityByAdding",UpdateQuantityByAdding)



export default route;