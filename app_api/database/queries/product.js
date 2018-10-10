const mongoose = require('mongoose');
const Product = mongoose.model('product');
const errorHandler = require('../db-error-handler');

module.exports.createProduct = (req, res, next) => {
    // console.log({...req.body})
    let newProduct = new Product({ ...req.body
    })
    newProduct.save()
        .then(saveRes => res.status(200).json(saveRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.editProduct = async (req, res, next) => {
    Product.findByIdAndUpdate(`${req.body._id || req.query._id || req.params._id}`, 
        {
            ...req.body
        }, 
        {
            // if true will return the updated data of the document
            new: true
        })
        .exec()
        .then(editRes => res.status(200).json(editRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndRemove(`${req.body._id || req.query._id || req.params._id}`)
        .exec()
        .then(delRes => res.status(200).json(delRes === null ? {
            msg: 'Produsul pe care ai vrut sa o elimini nu a fost gasit'
        } : delRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getProduct = (req, res, next) => {
    Product.find({
            name: req.params.name
        })
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}

module.exports.getAllProducts = (req, res, next) => {
    Product.find()
        .exec()
        .then(foundRes => res.status(200).json(foundRes))
        .catch(err => errorHandler(err, req, res, next))
}