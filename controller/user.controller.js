import Users from "../models/users.model.js";

export async function SaveUser(req ,res) {
    console.log("/user connected...")

  const req_Data = req.body;

  const data = new Users(req_Data);
  
  try{
    const result = await data.save();
    console.log(data)
    res.status(200).send(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
    
}

export async function GetAllUsers(req ,res) {
    const AllUsers=await Users.find({})
    res.json(AllUsers)
}

export async function GetUsersById(req ,res) {
  const {_id}= req.body;
  const UsersDetail=await Users.findById(_id)
  res.json(UsersDetail)
}

export async function GetUserByEmail(req ,res) {
  const {email }= req.body;
  const UsersDetail=await Users.find({email:email})
  res.json(UsersDetail)
}

export async function DeleteUserById(req ,res) {
  const {_id}= req.body;
  try{
      const result = await Users.deleteOne({_id:_id});
      console.log(result)
      res.status(200).send(result);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err);
    }
}

