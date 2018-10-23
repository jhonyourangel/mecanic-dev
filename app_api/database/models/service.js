const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
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
    createdBy: {
        type: String, 
        default: '',
        required: false
    },
    // the service name
    // ex: tires change, oil change, filters change
    name: {
        type: String,
        default: '',
        required: false
    },
    duration: {
        type: Number,
        default: 0,
        required: false
    },
    // maybe saving a product instead of reimplementing the brand, type and quantity 
    // product: {
    //     type: String,
    //     default: '',
    //     required: true
    // }

    brand: {
        type: String,
        default: '',
        required: false
    },
    type: {
        type: String,
        default: '',
        required: false
    },
    quantity: {
        type: Number,
        default: 0,
        required: false
    },
    // this is the cost of the service and not the cost of the products
    cost: {
        type: Number,
        default: '',
        required: false
    },
    note: {
        type: String,
        default: '',
        required: false
    }
})

mongoose.model('service', serviceSchema)
