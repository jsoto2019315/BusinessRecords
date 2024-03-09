import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from '../middlewares/validate-fields.js';
import { categoryFalse, existentCategory, existentProductName, verifyUserRole } from "../helpers/db-validators.js";

import { validateJWT } from '../middlewares/validate-jws.js';
import { addProduct } from "./products.controller.js";

const router = Router()

router.post(
    "/addNewProduct",
    [
        validateJWT,
        verifyUserRole,
        check("productName", "Required field").not().isEmpty(),
        check("productName").custom(existentProductName),
        check("description", "Required field").not().isEmpty(),
        check("category", "Required field").not().isEmpty(),
        check("category").custom(categoryFalse),
        check("price", "Required field").not().isEmpty(),
        check("stock", "Required field").not().isEmpty(),
        validateFields
    ], addProduct
);

export default router;