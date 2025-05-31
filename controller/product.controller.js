import Products from "../models/products.model.js"

export async function AllProductList(req,res) {
    const data = await Products.find({})
    res.json(data)
}

export async function AddProduct(req ,res) {
  const req_Data = req.body;

  const data = new Products(req_Data);
  
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

export async function GetProductById(req ,res) {
  const {_id}= req.body;
  const productDetail=await Products.findById(_id)
  res.json(productDetail)
}

export async function UpdateQuantityByOrder(req ,res) {
  const {_id,quantity}= req.body;
  try {
    const result = await Products.findByIdAndUpdate(
      _id,
      { $inc: { quantity: -quantity } },
      { new: true }
    );
    
    res.json(result)
  } catch (err) {
    console.error('Error ', err);
  }
}


export async function UpdateQuantityByAdding(req ,res) {
  const {_id,quantity}= req.body;
  try {
    const result = await Products.findByIdAndUpdate(
      _id,
      { $inc: { quantity: +quantity } },
      { new: true }
    );
   
    res.json(result)
  } catch (err) {
    console.error('Error ', err);
  }
}
