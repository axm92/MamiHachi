import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
})

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
    total: {type: Number, required: true},
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    customerName: {type: String, default: ''},
    customerEmail: {type: String, default: ''},
}, {timestamps: true})

export default mongoose.model('Order', orderSchema)