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
    }

})

mongoose.model('maintenance', maintenanceSchema)