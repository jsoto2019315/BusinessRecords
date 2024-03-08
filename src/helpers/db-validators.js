import Admin from "../Admin/admin.model.js";

import User from '../user/user.model.js';


//Validations for admin
export const mainAdmin = async(userAdmin = '') => {
    const mainAdmin = await Admin.findOne({userAdmin});
    if (mainAdmin) {
        throw new Error(`There can only be one main administrator. The main administrator is ${userAdmin}`);
    }
}
export const mainEmailAdmin = async(adminEmail = '') => {
    const mainEmailAdmin = await Admin.findOne({adminEmail});
    if (mainEmailAdmin) {
        throw new Error(`The email that you give is the email from the admin, the admin email is: ${adminEmail}`);
    }
}

//Validations for user
export const existentUserName = async(userName = '') => {
    const existentUserName = await User.findOne({userName});
    if(existentUserName){
        throw new Error(`User: ${userName} already exists. You must register another username.`)
    }
}
export const existentEmail = async(email = '') => {
    const existentEmail = await User.findOne({email});
    if(existentEmail){
        throw new Error(`User with email: ${email} already exists. You must register another email.`)
    }
}

//Role verification

