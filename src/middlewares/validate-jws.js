import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import Admin from '../Admin/admin.model.js';
import { exportedToken } from '../auth/auth.controller.js';

export const validateJWT = async (req, res, next) => {
    try {
        const token = exportedToken;

        if (!token) {
            return res.status(401).json({
                msg: 'There is no token, please log in to generate one'
            })
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);
        const admin = await Admin.findById(uid);

        if (!user && !user.status) {
            return res.status(401).json({
                msg: 'User does not exists on DB or user has a false status'
            })
        } else if (!admin && !admin.status) {
            return res.status(401).json({
                msg: 'Admin does not exists on DB or user has a false status'
            })
        }

        req.user = user;
        req.admin = admin;

        next();
    } catch (e) {
        console.log('');
        res.status(401).json({
            msg: 'Invalid token'
        })
        console.log("Token is:", exportedToken, "\n");
        console.log(e);
    }
}