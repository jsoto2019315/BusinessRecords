import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
    categoryName: {
        type: String,
        require: [true, "Required field"]
    },
    description: {
        type: String,
        require: [true, "Required field"]
    },
    status: {
        type: Boolean,
        default: true
    }
});

CategoriesSchema.methods.toJSON = function () {
    const { __v, _id, status, ...rest } = this.toObject();
    rest.uid = _id;
    return rest;
}

export default mongoose.model('Category', CategoriesSchema);