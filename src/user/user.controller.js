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

export const updateUser = async (req, res) => {
    try {
        const { _id, __v, searchedUser, newUser, ...rest } = req.body;
        const user = await User.findOne({ userName: searchedUser });

        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (newUser) {
            user.userName = newUser;
        }

        Object.assign(user, rest);

        await user.save();

        res.status(200).json({
            msg: 'User update successfully'
        })
    } catch (e) {
        return res.status(500).json({
            msg: ('Internal server error' + e)
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {userName} = req.body;
        const deleteUser = await User.findOne({userName});
        if(!deleteUser || deleteUser.status === false){
            return res.status(404).json({
                error: `The user *${userName}* doesn't exists`
            })
        }

        deleteUser.status = false;
        await deleteUser.save();

        return res.status(200).json({
            msg: `User ${userName} deleted`
        })
    } catch (e) {
        return res.status(500).json({
            msg: ('Internal server error' + e)
        })
    }
}
