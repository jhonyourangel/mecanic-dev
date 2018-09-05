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
        required: false
    },
    plateNumber: {
        type: String,
        default: '',
        unique: true,
        required: true,
        index: true,
        uppercase: true,
    },
    plateNationality: {
        type: String,
        default: '',
        required: true,
        uppercase: true,
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
        required: true
    },
    phoneNumber: {
        type: String,
        default: '',
        required: true
    },
    // vehicle brand, model and year
    brand: {
        type: String,
        enum: ['bmw', 'volswagen', 'audi'],
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