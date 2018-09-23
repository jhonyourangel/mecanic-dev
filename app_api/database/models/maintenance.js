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
    categories: {
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
        unique: true,
        required: true,
        index: true,
        uppercase: true,
    },
    carKm: {
        type: Number,
        default: 0,
        required: false
    },
    VIN: {
        type: String,
        default: '',
        required: true,
        uppercase: true,
    }

})

mongoose.model('maintenance', maintenanceSchema)