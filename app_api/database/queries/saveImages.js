let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('user');

let fs = require('fs');
let path = require('path');
let crypto = require('crypto');
let multer = require('multer');

/**
 * handle user functions:
 * getAllUsers, getUserByFirstLetter, getUserByName, findByUsername
 */
let userFunctions = require('./usersFunctions.js');

const PROFILE_IMAGES_SAVE_PATH = './public/images/';
const PROFILE_IMAGES_READ_PATH = '../images/';
// settings for multer
let storage = multer.diskStorage({
    // select the disk destination for the file you are about to save
    destination: function (req, file, cb) {
        cb(null, PROFILE_IMAGES_SAVE_PATH);
    },

    // set the name of the file you are about to save
    filename: function (req, file, cb) {
        console.log('diskstorage filename:',file);
        let imageName = Date.now() + '' + path.extname(file.originalname);
        file.newName = imageName;
        cb(null, imageName);
    }
});

/**
 * export multer
 * this will be used to save the image before 
 * responding to the user
 */
module.exports.upload =  multer({storage : storage});

/**
 * respond to the user after saving the immage
 */
module.exports.saveProfileImage = function(req, res){
    console.log(JSON.stringify(req.body.file));
    console.log(req.file);

    let filename = req.file.newName;

    userFunctions.updateProfileImage(req.body.userID, 
    PROFILE_IMAGES_READ_PATH + filename, 
    saved => {
        res.json({
            ok : "Upload Complete for " + filename +", for user:" + req.body.userID, 
            image: filename,
            save: saved.save            
        });
        
    });
}
