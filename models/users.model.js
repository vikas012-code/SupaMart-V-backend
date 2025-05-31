import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required:true
    },
    email:{
      type: String,
      required:true,
      index: {unique: true, dropDups: true}
    },
    password:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
export default Users;