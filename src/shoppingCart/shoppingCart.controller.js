import { response, request } from "express";
import ShoppingCart from "./shoppingCart.model.js";
import Product from "../products/products.model.js";
export const shoppingCart = async (req, res) => {
    try {
        const { products, user } = req.body;
        console.log(products);
        const productName = products[0].productName;
        // Search product by name
        const product = await Product.findOne({ productName: productName });

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        //Create shopping cart

        const quantity = products[0].quantity;
        const shoppingCart = new ShoppingCart({
            products: [
                {
                    productName: product._id,
                    quantity: quantity
                },
            ],
            user
        })



        const shoppingCartAdded = await shoppingCart.save();

        //Product mapping
        const productsNames = await Promise.all(
            shoppingCart.products.map(async (product) => {
                const productData = await Product.findById(product.productName);
                return {
                    productName: productData.productName,
                    quantity: quantity
                }
            })
        );

        shoppingCartAdded.products = productsNames;

        return res.status(200).json({
            msg: 'The products added to your shopping car are:',
            productsNames
        })

    } catch (e) {
        console.log(e);
    }




}

