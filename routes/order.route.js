import express from "express";
import { SaveOrder,GetAllOrder,GetOrdersById,GetRecentOrder } from "../controller/order.controller.js";

const route = express.Router()

route.get("/", GetAllOrder)

route.post("/", SaveOrder)

route.post("/byId",GetOrdersById)

route.get("/recentOrder",GetRecentOrder)




export default route;