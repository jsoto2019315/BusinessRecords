import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    userAdmin:{
        type: String,
        default: "jsoto"
    },
    adminName: {
        type: String,
        default: "José Soto"
    },
    email: {
        type: String,
        default: "jsoto@admin.org"
    },
    password: {
        type: String,
        default: "123"
    },
    role:{
        type: String,
        default: "ADMIN_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
});

AdminSchema.methods.toJSON = function(){
    const { __v, password, _id, role, status, ...adminRest} = this.toObject();
    adminRest.uid= _id;
    return adminRest;
}

export default mongoose.model('Admin', AdminSchema);