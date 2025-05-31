import wishlists from "../models/wishlist.model.js";

export async function SaveWishlist(req ,res) {
    const req_Data = req.body;

  const data = new wishlists(req_Data);
  
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

export async function unSaveWishlist(req ,res) {

  const {user_id,product_id} = req.body;  
  
  try{
    const result = await wishlists.deleteOne({user_id:user_id , product_id:product_id});
    console.log(result)
    res.status(200).send(result);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
    
}



export async function GetWishlistById(req ,res) {
    const {_id}= req.body;
    const UsersDetail=await wishlists.find({user_id:_id})
    res.json(UsersDetail)
}

export async function GetAllWishlist(req ,res) {
    const Allwishlistdata=await wishlists.find({})
    res.json(Allwishlistdata)
}