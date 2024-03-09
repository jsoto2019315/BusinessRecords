import bcryptjs from "bcryptjs";
import { response } from "express";
import Admin from "./admin.model.js";
import User from "../user/user.model.js";
import { mainAdmin } from "../helpers/db-validators.js";
export const getAdminUser = async (req, res) => {
    try {
        const defaultAdminUser = new Admin();
        const admin = new Admin({
            userAdmin: defaultAdminUser.userAdmin,
            adminName: defaultAdminUser.adminName,
            adminEmail: defaultAdminUser.email,
            adminPassword: defaultAdminUser.password
        });
        const defAdminUser = defaultAdminUser.userAdmin;

        const validateOneAdmin = await Admin.findOne({ userAdmin: defAdminUser });

        if (validateOneAdmin) {
            return res.status(401).json({
                msg: 'Main admin already exists, the admin is:',
                admin
            });
        }
        await mainAdmin(defAdminUser);



        await defaultAdminUser.save();

        res.status(200).json({
            admin
        })
    } catch (e) {
        console.error("Error trying to get the user:", e);
        return res.status(500).json({ message: "Internal service error" });
    }
}

export const updateRole = async (req, res) => {
    try {
        const { __v, _id, name, email, password, status, ...rest } = req.body;

        const user = await User.findOne({ userName: rest.userName });

        if (!user || !user.status) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }

        Object.assign(user, rest);

        await user.save();

        res.status(200).json({
            msg: 'User update successfully'
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error processing request"
        });
    }
}