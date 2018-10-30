const mongoose = require('mongoose')

const maintenanceSchema = new mongoose.Schema({
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
    products: {
        type: Array,
        default: [],
        required: false
    },
    services: {
        type: Array,
        default: [],
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
        uppercase: true,
    },
    vin: {
        type: String,
        default: '',
        uppercase: true,
    },
    carKm: {
        type: Number,
        default: 0,
        required: false
    },
    note: {
        type: String,
        default: '',
        required: false
    },
    nextServiceKm : {
        type: Number,
        default: 0,
        required: false
    },
    nextServiceDate : {
        type: String,
        default: new Date(),
        required: false
    },
})

mongoose.model('maintenance', maintenanceSchema)