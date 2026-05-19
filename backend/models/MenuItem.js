import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    price: {type: Number, required: true},
    category: {
        type: String,
        enum: ['mains', 'desserts', 'drinks'],
        default: 'mains'
    },
    available: {type: Boolean, default:true},
}, {timestamps: true})

export default mongoose.model('MenuItem', menuItemSchema)