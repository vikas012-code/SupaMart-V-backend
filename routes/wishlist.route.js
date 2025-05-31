import express from "express";
import { SaveWishlist ,GetAllWishlist,GetWishlistById,unSaveWishlist} from "../controller/wishlist.controller.js";

const route = express.Router()

route.get("/", GetAllWishlist)

route.post("/", SaveWishlist)

route.post("/byId",GetWishlistById)

route.delete("/unsaveWishlist",unSaveWishlist)


export default route;