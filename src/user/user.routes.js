import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";
import { existentEmail, existentUserName, mainAdmin, mainEmailAdmin } from "../helpers/db-validators.js";
import { addUser, deleteUser, updateUser } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jws.js";



const router = Router();

router.post(
    "/register",
    [
        check("userName", "Username is required").not().isEmpty(),
        check("userName").custom(existentUserName),
        check("userName").custom(mainAdmin),
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("email", "This isn't a valid email").isEmail(),
        check("email").custom(existentEmail),
        check("email").custom(mainEmailAdmin),
        check("password", "Username is required").not().isEmpty(),
        check("password", "Password must have 3 characters").isLength({min: 3}),
        validateFields,
    ], addUser
);

router.put(
    "/update",
    [
        validateJWT,
        check("searchedUser", "Required field").not().isEmpty(),
        validateFields
    ], updateUser
);

router.delete(
    "/delete",
    [
        validateJWT,
        check("userName", "Required field").not().isEmpty(),
        validateFields
    ], deleteUser
);
export default router;