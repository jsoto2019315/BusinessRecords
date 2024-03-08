import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        require: [true, "Required field"]
    },
    name: {
        type: String,
        require: [true, "Required field"]
    },
    email: {
        type: String,
        require: [true, "Required field"]
    },
    password: {
        type: String,
        require: [true, "Required field"]
    },
    role:{
        type: String,
        default: "USER_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: true
    }
});

export const specificParams = UserSchema.methods.ToJSON=function(){
    const {__v, password, _id, role, status, ...rest} = this.toObject();
    rest.uid=_id;
    return rest;
}

export default mongoose.model('User', UserSchema);