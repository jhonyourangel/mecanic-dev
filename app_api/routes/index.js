let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
let saveImages = require('../database/queries/saveImages.js');
let acl = require('../database/queries/acl.js');

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
let transactions = require('../database/queries/transaction.js')
let projects = require('../database/queries/project.js')

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



/**
 * adding api support for ios app 
 */
// transactions
router.get('/ios/transaction/:transaction', auth,transactions.getTransaction);
router.get('/ios/transactions', auth,transactions.getTransactions);
router.post('/ios/addtransaction', auth,transactions.postTransaction);
router.put('/ios/edittransaction', auth,transactions.putTransaction);
router.delete('/ios/deletetransaction', auth, transactions.deleteTransactions);

// project
router.get('/ios/project/:project', auth, projects.getProject);
router.get('/ios/projects', auth, projects.getProjects);
router.post('/ios/addproject', auth, projects.postProject);
router.put('/ios/editproject', auth, projects.putProject);
router.delete('/ios/deleteproject', auth, projects.deleteProject);

 // get the list of all the users
router.get('/ios/get/users', dbUsers.getAllUsers);




/**
 * adding api support for pwa app 
 */
// transactions
router.get('/pwa/transaction/:transaction', auth,transactions.getTransaction);
router.get('/pwa/transactions', auth,transactions.getTransactions);
router.post('/pwa/addtransaction', auth,transactions.postTransaction);
router.put('/pwa/edittransaction', auth,transactions.putTransaction);
router.delete('/pwa/deletetransaction', auth, transactions.deleteTransactions);

// project
router.get('/pwa/project/:project', auth, projects.getProject);
router.get('/pwa/projects', auth, projects.getProjects);
router.post('/pwa/addproject', auth, projects.postProject);
router.put('/pwa/editproject', auth, projects.putProject);
router.delete('/pwa/deleteproject', auth, projects.deleteProject);

 // get the list of all the users
router.get('/pwa/get/users', dbUsers.getAllUsers);

module.exports = router;