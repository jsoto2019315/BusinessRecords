import { Router } from "express";
import { getAdminUser } from "./admin.controller.js";
import { check } from "express-validator";
import { mainAdmin } from "../helpers/db-validators.js";

const router = Router();

router.get(
    "/showAdmin",
    [
        check("userAdmin").custom(mainAdmin),
    ], getAdminUser
);

export default router;