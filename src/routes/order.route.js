import express from "express";
import { SaveOrder, GetAllOrder, GetOrdersById, GetRecentOrder } from "../controllers/order.controller.js";

const route = express.Router()

route.get("/", GetAllOrder)

route.post("/", SaveOrder)

route.get("/OrderById/:id", GetOrdersById)

route.get("/recentOrder", GetRecentOrder)




export default route;