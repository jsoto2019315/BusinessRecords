import { response, request } from "express";
import Invoice from "./invoice.model.js";
import ShoppingCart from "../shoppingCart/shoppingCart.model.js";
import Product from "../products/products.model.js";

export const showInvoice = async (req, res) => {
    try {
        const { userId } = req.body;

        const shoppingCart = await ShoppingCart.findOne({ user: userId }).populate('products.productName');

        if (!shoppingCart) {
            return res.status(404).json({ message: "No se encontró un carrito de la compra para este usuario." });
        }

        let total = 0;
        shoppingCart.products.forEach(item => {
            total += item.quantity * item.productName.price;
        });

        const invoice = new Invoice({
            invoiceNumber: 'FCT-' + Date.now(),
            user: userId,
            products: shoppingCart.products.map(item => ({
                productName: item.productName.productName,
                quantity: item.quantity,
                price: item.productName.price
            })),
            issueDate: new Date(),
            total: total
        });

        await invoice.save();
        for (const product of shoppingCart.products) {
            const foundProduct = product.productName;
            const newStock = foundProduct.stock - product.quantity;
            const update = {
                $inc: { stock: -product.quantity },
                $set: { status: newStock === 0 ? 'SOLD' : foundProduct.status }
            };
            await Product.findByIdAndUpdate(foundProduct._id, update);
        }

        // await shoppingCart.save();

        res.status(201).json({ message: "Factura generada exitosamente.", invoice });
    } catch (error) {
        console.error("Error al generar la factura:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}