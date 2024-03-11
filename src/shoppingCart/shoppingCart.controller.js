import { response, request } from "express";
import ShoppingCart from "./shoppingCart.model.js";
import Product from "../products/products.model.js";
import User from "../user/user.model.js";
export const shoppingCart = async (req, res) => {
    try {
        const { products, user } = req.body;
        console.log(products);

        let processedProducts = [];
        let totalQuantity = 0;

        for (let product of products) {
            const productName = product.productName;
            // Busca el producto por nombre
            const foundProduct = await Product.findOne({ productName: productName });

            if (!foundProduct || foundProduct.status === 'SOLD') {
                return res.status(404).json({
                    error: `Product ${productName} not found`
                });
            }

            if (product.quantity > foundProduct.stock) {
                return res.status(400).json({
                    error: `The requested quantity for product ${productName} exceeds the available stock`
                });
            }

            processedProducts.push({
                productName: foundProduct._id,
                quantity: product.quantity
            });

            totalQuantity += product.quantity;
        }

        const shoppingCart = new ShoppingCart({
            products: processedProducts,
            user,
            totalQuantity
        });

        const shoppingCartAdded = await shoppingCart.save();

        const productsNames = await Promise.all(
            shoppingCart.products.map(async (product) => {
                const productData = await Product.findById(product.productName);
                return {
                    productName: productData.productName,
                    quantity: product.quantity,
                }
            })
        );

        shoppingCartAdded.products = productsNames;

        const foundUser = await User.findById(user);
        const userFounded = foundUser.name;

        return res.status(200).json({
            msg: 'The products added to your shopping cart are:',
            productsNames,
            user: `The user who added products to shopping cart is: ${userFounded}`,
            total: `The total products that you added are: ${totalQuantity}`

        });

    } catch (e) {
        console.log(e);
    }
}
