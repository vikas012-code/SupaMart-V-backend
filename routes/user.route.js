import express from "express"   
import { SaveUser,GetAllUsers,GetUsersById,GetUserByEmail,DeleteUserById } from "../controller/user.controller.js";

const route =express.Router()

route.get("/" , GetAllUsers);

route.post("/" , SaveUser);

route.get("/getbyid",GetUsersById)

route.post("/getuserbyemail", GetUserByEmail)

route.delete("/deleteuserbyid", DeleteUserById)


export default route;