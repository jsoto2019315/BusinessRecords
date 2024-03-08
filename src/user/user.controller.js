import bcryptjs from "bcryptjs";
import { response, request } from "express";
import User from './user.model.js';

export const addUser = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body;
        const user = new User({ userName, name, email, password });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            msg: ('Welcome, your user data is:'),
            user
        })
    } catch (e) {
        console.log('Mistake creating the user\n', e);
    }
}