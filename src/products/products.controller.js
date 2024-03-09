import { response, request } from "express";
import Product from "./products.model.js";
import Category from '../categories/categories.model.js'

//Add new product
export const addProduct = async (req, res) => {
    try {
        const { productName, description, category, price, stock, productsEntered } = req.body;
        const product = new Product({ productName, description, category, price, stock, productsEntered });

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

//View product
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
export const viewAllCatalog = async (req, res) => {
    try {
        const products = { status: 'IN_STOCK' };

        const [total, allProducts] = await Promise.all([
            Product.countDocuments(products),
            Product.find(products)
                .populate('category', '-_id categoryName')
                .sort({ 'category': -1 })
        ])

        res.status(200).json({
            total,
            allProducts
        })
    } catch (e) {
        res.status(500).json({
            msg: ('Internal service error' + e)
        })
        console.log(e)
    }
}

//Edit data
export const updateProduct = async (req, res) => {
    try {
        const { _id, __v, searchedProduct, newProductName, ...rest } = req.body;
        const product = await Product.findOne({ productName: searchedProduct });

        //CAMBIAR A QUE SI EL ESTADO ES FALSO NO SE PUEDA EDITAR, XQ NO EXISTE
        if (!product) {
            return res.status(400).json({
                error: 'Product not found'
            });
        }

        if (newProductName) {
            product.productName = newProductName;
        }

        Object.assign(product, rest);

        await product.save();

        res.status(200).json({
            msg: 'Product update successfully'
        });

    } catch (e) {
        return res.status(500).json({
            msg: ('Internal server error', e)
        }),
            console.log(e)
    }
}

//Delete product
export const deleteProduct = async (req, res) => {
    const { productName } = req.body;
    const deleteProduct = await Product.findOneAndDelete({ productName });
    if (!deleteProduct || deleteProduct.status === 'DELETED') {
        return res.status(404).json({
            error: `The product *${productName}* doesn't exists`
        })
    }

    // deleteProduct.status = 'DELETED';
    // deleteProduct.stock = 0;
    // await deleteProduct.save();

    return res.status(200).json({
        msg: 'Product deleted'
    })
}