import express from "express"   
import { SaveUser,GetAllUsers,GetUsersById,GetUserByEmail,DeleteUserById,verifyOTP,sendOTP,ResetPassword } from "../controller/user.controller.js";

const route =express.Router()

route.get("/" , GetAllUsers);

route.post("/" , SaveUser);

route.get("/getbyid",GetUsersById)

route.post("/getuserbyemail", GetUserByEmail)

route.delete("/deleteuserbyid", DeleteUserById)

route.post("/sendotp", sendOTP)

route.post("/verifyotp", verifyOTP)


route.post("/resetpassword", ResetPassword)

//U2FsdGVkX19Du6735IFLSk+yhuE17hMsjf6sZomp6e8=
export default route;