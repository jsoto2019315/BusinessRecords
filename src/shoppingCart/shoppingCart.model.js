import mongoose from "mongoose";

const ShoppingCartSchema = mongoose.Schema({

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
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