import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      default: 0,
    },
    quantity:
    {
      type:Number,
      required:true,
    }
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);
export default Products;