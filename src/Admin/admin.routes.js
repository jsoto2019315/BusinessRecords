import { Router } from "express";
import { getAdminUser, updateRole } from "./admin.controller.js";
import { check } from "express-validator";
import { mainAdmin } from "../helpers/db-validators.js";
import { validateJWT } from "../middlewares/validate-jws.js";
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.get(
    "/showAdmin",
    [
        check("userAdmin").custom(mainAdmin),
    ], getAdminUser
);

router.put(
    "/updateRole",
    [
        validateJWT,
        check("role", "Required field").not().isEmpty(),
        validateFields
    ], updateRole
);
export default router;