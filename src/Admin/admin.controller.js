import bcryptjs from "bcryptjs";
import { response } from "express";
import Admin from "./admin.model.js";

export const getAdminUser = async (req, res) => {
    try {
        const defaultAdminUser = new Admin();

        const admin = new Admin({
            userAdmin: defaultAdminUser.userAdmin,
            adminName: defaultAdminUser.adminName,
            adminEmail: defaultAdminUser.adminEmail,
            adminPassword: defaultAdminUser.adminPassword
        });
        
        await defaultAdminUser.save();

        res.status(200).json({
            admin
        })
    } catch (e) {
        console.error("Error trying to get the user:", e);
        // return res.status(500).json({ message: "Internal service error" });
    }
}