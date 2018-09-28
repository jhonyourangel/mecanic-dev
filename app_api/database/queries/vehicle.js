const mongoose = require('mongoose');
const Vehicle = mongoose.model('vehicle');
const errorHandler = require('../db-error-handler');

module.exports.createVehicle = (req, res, next) => {
    let newVehicle = new Vehicle({ ...req.body })
    newVehicle.save()
        .then(saveRes => res.status(200).json(saveRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.editVehicle = async (req, res, next) => {
    Vehicle.findByIdAndUpdate(`${req.body._id || req.query._id || req.params._id}`, 
        {
            ...req.body
        }, {
            // if true will return the updated data of the document
            new: true
        })
        .exec()
        .then(editRes => res.status(200).json(editRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.deleteVehicle = (req, res, next) => {
    Vehicle.findByIdAndRemove(`${req.body.id || req.query.id || req.params.id}`)
        .exec()
        .then(delRes => res.status(200).json(delRes === null ? 
            {msg: 'Masina pe care ai vrut sa o elimini nu a fost gasita' } 
            : delRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getVehicle = (req, res, next) => {
    Vehicle.find({
            plateNumber: req.params.plateNumber.toUpperCase()
        })
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getAllVehicles = (req, res, next) => {
    Vehicle.find()
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}