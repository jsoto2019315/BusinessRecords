import mongoose from "mongoose";
import { Schema } from "mongoose";

const InvoiceSchema = mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
     },
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
     products: [{
        productName: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
     }],
     issueDate: {
        type: Date,
        default: Date.now
     },
     total: {
        type: Number,
        required: true
     }
})

export default mongoose.model('Invoice', InvoiceSchema);