import Admin from "../Admin/admin.model.js";
import User from '../user/user.model.js';
import Category from "../categories/categories.model.js";

//Validations for admin
export const mainAdmin = async (userAdmin = '') => {
    const mainAdmin = await Admin.findOne({ userAdmin });
    if (mainAdmin) {
        throw new Error(`There can only be one main administrator. The main administrator is ${userAdmin}`);
    }
}
export const mainEmailAdmin = async (adminEmail = '') => {
    const mainEmailAdmin = await Admin.findOne({ adminEmail });
    if (mainEmailAdmin) {
        throw new Error(`The email that you give is the email from the admin, the admin email is: ${adminEmail}`);
    }
}

//Validations for user
export const existentUserName = async (userName = '') => {
    const existentUserName = await User.findOne({ userName });
    if (existentUserName) {
        throw new Error(`User: ${userName} already exists. You must register another username.`)
    }
}
export const existentEmail = async (email = '') => {
    const existentEmail = await User.findOne({ email });
    if (existentEmail) {
        throw new Error(`User with email: ${email} already exists. You must register another email.`)
    }
}

//Role verification
export const verifyUserRole = async (req, res, next) => {
    try {
        const role = global.exportRole;
        const adminRole = await Admin.findOne({ role });

        console.log(role);
        if (!adminRole) {
            return res.status(401).json({
                msg: 'You are not an admin, you do not have this permissions'
            })
        }
    } catch (e) {
        console.log(e)
    }
    next();
}

// Validations to categories
export const existentCategory = async (categoryName = '') => {
    const existentCategory = await Category.findOne({categoryName});
    if (existentCategory) {
        throw new Error("This category already exists");
    }
}