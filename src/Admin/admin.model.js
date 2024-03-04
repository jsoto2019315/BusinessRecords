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
    adminEmail: {
        type: String,
        default: "jsoto@admin.org"
    },
    adminPassword: {
        type: String,
        default: "123"
    },
    status: {
        type: Boolean,
        default: true
    }
});

AdminSchema.methods.toJSON = function(){
    const { __v, adminPassword, _id, status, ...adminRest} = this.toObject();
    admin.uid= _id;
    return admin;
}