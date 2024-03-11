import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from '../middlewares/validate-fields.js';

import { validateJWT } from "../middlewares/validate-jws.js";
import { shoppingCart } from "./shoppingCart.controller.js";

const router = Router()

router.post(
    "/addShoppingCart",
    [
        validateJWT,
        check("products", "Required field").not().isEmpty(),
        check("user", "Required field").not().isEmpty(),
        validateFields,
    ], shoppingCart
)

export default router;