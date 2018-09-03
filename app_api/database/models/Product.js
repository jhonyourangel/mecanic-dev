const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: new Date(), 
        required: true
    },
    editDate: {
        type: Date,
        default: new Date(), 
        required: false
    },
    name: {
        type: String,
        default: '',
        required: false
    },
    brand: {
        type: String,
        default: '',
        required: false
    },
    details: {
        type: String,
        default: '',
        required: false
    },
    quantity: {
        type: String,
        default: '',
        required: false
    },
    cost: {
        type: Number,
        default: '',
        required: false
    }
})

mongoose.model('product', productSchema)