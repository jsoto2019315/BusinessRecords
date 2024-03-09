import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from '../middlewares/validate-fields.js';
import { categoryFalse, existentProductName, nonExistentProduct, verifyUserRole } from "../helpers/db-validators.js";

import { validateJWT } from '../middlewares/validate-jws.js';
import { addProduct, viewCatalog, viewIndividualProduct } from "./products.controller.js";

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

router.get(
    "/viewIndividualProduct",
    [
        validateJWT,
        verifyUserRole,
        check("productName", "Required field").not().isEmpty(),
        check("productName").custom(nonExistentProduct),
        validateFields
    ],
    viewIndividualProduct
);

router.get(
    "/viewCatalog",
    [
        check("category", "RequiredField").not().isEmpty(),
        validateFields
    ], viewCatalog
)
export default router;