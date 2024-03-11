import mongoose from "mongoose";
import { Schema } from "mongoose";

const ShoppingCartSchema = new mongoose.Schema({
    products: [
        {
            productName: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ShoppingCartSchema.methods.toJSON = function () {
    const { __v, _id, ...rest} = this.toObject();
    rest.uid = _id;
    return rest;
}

export default mongoose.model('ShoppingCart', ShoppingCartSchema);