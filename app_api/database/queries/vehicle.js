const mongoose = require('mongoose');
const moment = require('moment');
const Vehicle = mongoose.model('vehicle');
const errorHandler = require('../db-error-handler');

module.exports.createVehicle = (req, res, next) => {
    // console.log({...req.body})
    let newVehicle = new Vehicle({...req.body})
    newVehicle.save()
    .then(saveRes => res.status(200).json(newVehicle))
    .catch(err => errorHandler(err, req, res, next))
}