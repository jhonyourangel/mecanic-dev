const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const saveImages = require('../database/queries/saveImages.js');

const auth = jwt({
    secret: process.env.MY_SECRET,
    userProperty: 'payload'
});
const {
    createVehicle,
    editVehicle,
    deleteVehicle,
    getVehicle,
    getAllVehicles
} = require('../database/queries/vehicle')

const {
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getAllProducts
} = require('../database/queries/product')

const {
    createMaintenance,
    editMaintenance,
    deleteMaintenance,
    getMaintenance,
    getAllMaintenances
} = require('../database/queries/maintenance')

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');

const dbUsers = require('../database/queries/usersFunctions.js');
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/reauth', ctrlAuth.reauth);

// route all the request to the auth method
router.use(auth)
// get the profile of the logged user
router.get('/profile', ctrlProfile.profileRead);


/******** vehicle api */

router.post('/pwa/vehicle', createVehicle)
router.put('/pwa/vehicle', editVehicle)
router.delete('/pwa/vehicle', deleteVehicle)
router.get('/pwa/vehicle/:plateNumber', getVehicle)
router.get('/pwa/vehicle', getAllVehicles)

/******** product api */
router.post('/pwa/product', createProduct)
router.put('/pwa/product', editProduct)
router.delete('/pwa/product', deleteProduct)
router.get('/pwa/product/:name', getProduct)
router.get('/pwa/product', getAllProducts)

/******** maintenance api */
router.post('/pwa/maintenance', createMaintenance)
router.put('/pwa/maintenance', editMaintenance)
router.delete('/pwa/maintenance', deleteMaintenance)
router.get('/pwa/maintenance/:plateNumber', getMaintenance)
router.get('/pwa/maintenance', getAllMaintenances)

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