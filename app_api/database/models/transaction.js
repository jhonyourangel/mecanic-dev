const mongoose = require('mongoose');
const crypto = require('crypto');

const transactionSchema = new mongoose.Schema({

    // the object id is causing me trouble.
    // temporary fix is to add my own generated id
    // id: {
    //     type: String,
    //     default: function () { return crypto.randomBytes(16).toString('hex') + `${Date.now()}` } 
    // },
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
    description: {
        type: String,
    },
    billed: {
        type: Boolean,
        default: false,
        required: true
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    // ids from other models
    // 
    userId: {
        type: String,
        required: false
    },
    projectName: {
        type: String,
        required: false
    }
});
mongoose.model('transaction', transactionSchema);