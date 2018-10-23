const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: new Date(), 
        required: false
    },
    editDate: {
        type: Date,
        default: new Date(), 
        required: false
    },
    // what category is for ????
    category: {
        type:String,
        default: '',
        required: false
    },
    plateNumber: {
        type: String,
        default: '',
        unique: true,
        required: false,
        index: true,
        uppercase: true,
    },
    vin: {
        type: String,
        default: '',
        required: false,
        uppercase: true,
    },
    plateNationality: {
        type: String,
        default: '',
        required: false,
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
        // enum: ['bmw', 'volswagen', 'audi'],
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
    note: {
        type: String,
        default: '',
        required: false
    }
})

mongoose.model('vehicle', vehicleSchema)