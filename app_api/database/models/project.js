const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
name: {
        type: String,
        require: true
    },
    income: {
        type: Number, // this will be saved as cents
        require: true
    },
    // also in the future may you want to create a collection for income types like:
    // 8€ per 1h of work
    // 64€ per 1day of work 
    // some future properties
    cost: {
        type:Number,
        require: false
    },
    costDescription: {
        type:Number,
        require: false
    }
})

mongoose.model('project', projectSchema);