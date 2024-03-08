import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import Admin from '../Admin/admin.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

let exportedToken = '';

export const login = async (req, res) => {
    try {
        let user;
        let admin;
        const { email, password } = req.body;

        if (email) {
            user = await User.findOne({ email });
            admin = await Admin.findOne({ email });
            if (!user && !admin) {
                return res.status(400).json({
                    msg: "Email hasn't been register"
                });
            }
            if (user && !user.status || admin && !admin.status) {
                return res.status(400).json({
                    msg: "Email doesn't exist in DB",
                });
            }

            if (user) {
                const validPassword = bcryptjs.compareSync(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({
                        msg: "Incorrect password"
                    });
                }

                const token = await generateJWT(user.id);
                exportedToken = token;

                res.status(200).json({
                    msg: `You have logged in successfully, welcome ${user.userName}, with token: ${token}`
                });
            } else if (admin) {
                const validPassword = await Admin.findOne({ password })
                if (!validPassword) {
                    return res.status(400).json({
                        msg: "Incorrect password"
                    });
                }

                const token = await generateJWT(admin.id);
                exportedToken = token;

                res.status(200).json({
                    msg: `You have logged in successfully, welcome ${admin.userAdmin}, with token: ${token}`
                });
            }
        }
    } catch (e) {
        console.log("Contact the admin")
        throw new Error(e);
    }
}

export { exportedToken };