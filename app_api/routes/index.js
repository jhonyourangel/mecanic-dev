let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
let saveImages = require('../database/queries/saveImages.js');

let auth = jwt({
    secret: process.env.MY_SECRET,
    userProperty: 'payload'
});


let ctrlProfile = require('../controllers/profile');
let ctrlAuth = require('../controllers/authentication');

/**
 * handle user functions: 
 * getAllUsers, getUserByFirstLetter, getUserByName, findByUsername
 */
let dbUsers = require('../database/queries/usersFunctions.js');

// dev only !!!
//    let createUsers = require('../dev-scripts/createUsers.js');
// dev only


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// post another user profile
router.get('/profile/:username', auth, dbUsers.findByUsername);

// handle register registration
router.post('/register', ctrlAuth.register);

// handle login
router.post('/login', ctrlAuth.login);

// handle login
router.post('/reauth', ctrlAuth.reauth);

// save user profile information 
router.post('/save/profile', auth, ctrlProfile.profileSave);

// get the list of all the users
router.get('/get/users', auth, dbUsers.getAllUsers);

// get a specific user first letter
router.get('/get/user/:username', auth, dbUsers.getUserByFirstLetter);

// upload profile image
router.post('/upload', saveImages.upload.single('photo'), saveImages.saveProfileImage);

 // get the list of all the users
router.get('/pwa/get/users', dbUsers.getAllUsers);



module.exports = router;