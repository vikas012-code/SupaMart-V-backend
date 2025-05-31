import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
{
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product_id: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: 
    {
    type:Number,
    required: true,
    default:1,
    },
    
},
{timestamps: true}
);

const orders = mongoose.model("orders", orderSchema);
export default orders;