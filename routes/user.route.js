import express from "express"   
import { SaveUser,GetAllUsers,GetUsersById,GetUserByEmail,DeleteUserById,verifyOTP,sendOTP,ResetPassword } from "../controller/user.controller.js";

const route =express.Router()

route.get("/" , GetAllUsers);

route.post("/" , SaveUser);

route.get("/:id",GetUsersById)

route.get("/:email", GetUserByEmail)

route.delete("/deleteuserbyid", DeleteUserById)

route.post("/sendotp", sendOTP)

route.post("/verifyotp", verifyOTP)

route.post("/resetpassword", ResetPassword)

export default route;