import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import Admin from '../Admin/admin.model.js';
import { exportedToken } from '../auth/auth.controller.js';


export const validateJWT = async (req, res, next) => {
    global.exportRole = null;
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

        if (user) {
            if (!user) {
                return res.status(401).json({
                    msg: 'User does not exists on DB or user has a false status'
                })
            }
            req.user = user;
            const userRole = user.role;
            global.exportRole = userRole;
        } else if (admin) {
            if (!admin) {
                return res.status(401).json({
                    msg: 'Admin does not exists on DB or user has a false status'
                })
            }
            req.admin = admin;
            const adminRole = admin.role;
            global.exportRole = adminRole;
        }

        next();
    } catch (e) {
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}