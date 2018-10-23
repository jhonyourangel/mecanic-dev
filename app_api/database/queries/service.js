const mongoose = require('mongoose');
const Service = mongoose.model('service');
const errorHandler = require('../db-error-handler');
const jwtDecode = require('../decodeToken')


module.exports.createService = (req, res, next) => {
    const createdBy = jwtDecode.decodeToken(req.headers.authorization)
    
    console.log(req.body);
    let newService = new Service({
        ...req.body,
        createdBy,
    })
    newService.save()
        .then(saveRes => res.status(200).json(saveRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.editService = async (req, res, next) => {
    Service.findByIdAndUpdate(`${req.body._id || req.query._id || req.params._id}`, 
        {
            ...req.body,
        }, {
            // if true will return the updated data of the document
            new: true
        })
        .exec()
        .then(editRes => res.status(200).json(editRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.deleteService = (req, res, next) => {
    Service.findByIdAndRemove(`${req.body._id || req.query._id || req.params._id}`)
        .exec()
        .then(delRes => res.status(200).json(delRes === null ? {
            msg: 'Servisul pe care ai vrut sa il elimini nu a fost gasit'
        } : delRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getService = (req, res, next) => {
    Service.find({
            plateNumber: req.params.plateNumber.toUpperCase()
        })
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getAllServices = (req, res, next) => {
    Service.find()
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}
