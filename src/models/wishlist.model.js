import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema(
{
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product_id: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
},
{timestamps: true}

);

const wishlists = mongoose.model("wishlists", wishlistSchema);
export default wishlists;