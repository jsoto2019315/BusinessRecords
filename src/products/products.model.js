import mongoose, { Schema } from "mongoose";
const ProductsSchema = mongoose.Schema({
    productName: {
        type: String,
        require: [true, "Required field"]
    },
    description: {
        type: String,
        require: [true, "Required field"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        require: [true, "Required field"]
    },
    productsEntered: {
        type: Number,
        require: [true, "Required field"]
    },
    stock: {
        type: Number,
        require: [true, "Required field"]
    },
    status: {
        type: String,
        enum: ['IN_STOCK', 'SOLD', 'DELETED'],
        default: 'IN_STOCK',
    }
});

ProductsSchema.methods.toJSON = function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.uid = _id;
    return rest;
}

export default mongoose.model('Product', ProductsSchema)