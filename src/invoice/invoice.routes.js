import { Router } from "express";
import { check } from "express-validator";

import { validateJWT } from "../middlewares/validate-jws.js";
import { showInvoice } from "./invoice.controler.js";

const router = Router();

router.get(
    "/showInvoice",
    [
        validateJWT,
    ],
    showInvoice
)

export default router;