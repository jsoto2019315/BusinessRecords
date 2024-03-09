import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from '../middlewares/validate-fields.js';
import { existentCategory, verifyUserRole } from "../helpers/db-validators.js";

import { validateJWT } from '../middlewares/validate-jws.js'
import { addCategory, updateCategory, viewCategories } from "./categories.controller.js";


const router = Router();

router.post(
    "/addCategory",
    [
        validateJWT,
        verifyUserRole,
        check("categoryName", "Required field").not().isEmpty(),
        check("categoryName").custom(existentCategory),
        check("description", "Required field").not().isEmpty(),
        validateFields,
    ], addCategory
);

router.get(
    "/viewCategory",
    [
        validateJWT,
        verifyUserRole,
    ], viewCategories
);

router.put(
    "/updateCategory",
    [
        validateJWT,
        verifyUserRole,
        check("oldCategoryName", "Required field").not().isEmpty(),
        check("newCategoryName", "Required field").not().isEmpty(),
        check("description", "Required field").not().isEmpty(),
        validateFields,
    ], updateCategory
);


export default router;