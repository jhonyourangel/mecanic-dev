const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const saveImages = require('../database/queries/saveImages.js');

const auth = jwt({
    secret: process.env.MY_SECRET,
    userProperty: 'payload'
});

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');

/**
 * handle user functions: 
 * getAllUsers, getUserByFirstLetter, getUserByName, findByUsername
 */
const dbUsers = require('../database/queries/usersFunctions.js');

// dev only !!!
//    let createUsers = require('../dev-scripts/createUsers.js');
// dev only

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/reauth', ctrlAuth.reauth);

// route all the request to the auth method
router.use(auth)
// get the profile of the logged user
router.get('/profile', ctrlProfile.profileRead);


const {
    createVehicle
} = require('../database/queries/vehicle')
/******** vehicle api */
router.post('/pwa/vehicle', createVehicle)





/************ begin of bad api */
// post another user profile
router.get('/profile/:username', dbUsers.findByUsername);
// save user profile information 
router.post('/save/profile', ctrlProfile.profileSave);
// get the list of all the users
router.get('/get/users', dbUsers.getAllUsers);
// get a specific user by searching for the first letter usernameLetter
router.get('/get/user/:username', dbUsers.getUserByFirstLetter);
// upload profile image
router.post('/upload', saveImages.upload.single('photo'), saveImages.saveProfileImage);
 // get the list of all the users
router.get('/pwa/get/users', dbUsers.getAllUsers);
/************************************** end bad api */


module.exports = router;