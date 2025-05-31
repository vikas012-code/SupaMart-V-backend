import orders from "../models/orders.model.js";

export async function SaveOrder(req ,res) {
  const req_Data = req.body;

  const data = new orders(req_Data);
  
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

export async function GetOrdersById(req ,res) {
    const {_id}= req.body;
    const UsersDetail=await orders.find({user_id:_id})
    res.json(UsersDetail)
}

export async function GetAllOrder(req ,res) {
    const AllOrdersdata=await orders.find({}).sort({ createdAt: -1 }).exec();
    res.json(AllOrdersdata)
}

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

export async function GetRecentOrder(req ,res) {
  const recentOrder=await orders.find({
    createdAt: {
      $gte: todayStart,
      $lt: todayEnd,
    },
  })
  res.json(recentOrder)
}


