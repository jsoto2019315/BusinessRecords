import { response, request } from "express";
import Product from "./products.model.js";
import Category from '../categories/categories.model.js'

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

//View individual product
export const viewIndividualProduct = async (req, res) => {
    try {
        const { productName } = req.body;
        const product = await Product.findOne({ productName });

        res.status(200).json({
            product
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: ('Internal service error ' + e)
        })
    }
}

//View catalog
export const viewCatalog = async (req, res) => {
    try {
        const { category } = req.body;
        const products = await Product.find({ category }).populate('category', '-_id categoryName');
        const catalog = ({ category })
        const total = await Product.countDocuments(catalog)

        res.status(200).json({
            msg: 'Products found:',
            total,
            products
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: ('Internal service error ' + e)
        })
    }
}