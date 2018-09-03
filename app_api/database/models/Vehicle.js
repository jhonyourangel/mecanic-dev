const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
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
    category: {
        type:String,
        default: '',
        required: fasle
    },
    plateNumber: {
        type: String,
        default: '',
        required: false
    },
    carKm: {
        type: Number,
        default: 0,
        required: false
    },
    // the owner full name
    owner: {
        type: String,
        default: '',
        required: false
    },
    email: {
        type: String,
        default: '',
        required: false
    },
    phoneNumber: {
        type: String,
        default: '',
        required: false
    },
    // vehicle brand, model and year
    brand: {
        type: String,
        default: '',
        required: false
    },
    model: {
        type: String,
        default: '',
        required: false
    },
    year: {
        type: String,
        default: '',
        required: false
    },
})

mongoose.model('vehicle', vehicleSchema)