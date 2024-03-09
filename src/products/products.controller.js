import { response, request } from "express";
import Product from "./products.model.js";

//Add new product
export const addProduct = async (req, res) => {
    try {
        const { productName, description, category, price, stock } = req.body;
        const product = new Product({ productName, description, category, price, stock });

        await product.save();

        res.status(200).json({
            msg: 'The product that you add is:',
            product
        })
    } catch (e) {
        res.status(500).json({
            msg: ('Mistake creating the product ' + e)
        })
    }
}