const mongoose = require('mongoose');
const Maintenance = mongoose.model('maintenance');
const errorHandler = require('../db-error-handler');
const jwtDecode = require('../decodeToken')


module.exports.createMaintenance = (req, res, next) => {
    const createdBy = jwtDecode.decodeToken(req.headers.authorization)
    let newMaintenance = new Maintenance({
        ...req.body,
        createdBy,
        products: req.body.products.split(',')
    })
    newMaintenance.save()
        .then(saveRes => res.status(200).json(saveRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.editMaintenance = async (req, res, next) => {
    Maintenance.findByIdAndUpdate(`${req.body._id || req.query._id || req.params._id}`, 
        {
            ...req.body,
            products: req.body.products.split(',')
        }, {
            // if true will return the updated data of the document
            new: true
        })
        .exec()
        .then(editRes => res.status(200).json(editRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.deleteMaintenance = (req, res, next) => {
    Maintenance.findByIdAndRemove(`${req.body._id || req.query._id || req.params._id}`)
        .exec()
        .then(delRes => res.status(200).json(delRes === null ? {
            msg: 'Intretinerea pe care ai vrut sa o elimini nu a fost gasita'
        } : delRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getMaintenance = (req, res, next) => {
    Maintenance.find({
            plateNumber: req.params.plateNumber.toUpperCase()
        })
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getAllMaintenances = (req, res, next) => {
    Maintenance.find()
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}