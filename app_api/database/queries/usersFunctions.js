let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('user');



module.exports.getAllUsers = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log('get all users');
    User
        .find({}).limit(15)
        .select({
            hash: 0,
            salt: 0
        })
        .exec(function (err, user) {
            if (err) return err;

            res.status(200).json(user);
        });
};

module.exports.getUserByFirstLetter = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log('get user by first letter');
    console.log("username called:", req.params.username);
    // \bE\w+
    const rEx_username =  new RegExp(`\\b` + req.params.username + `\\w+`, 'i');
    console.log(rEx_username);    
    User
        .find({'username' : rEx_username}).limit(15)
        .exec(function (err, user) {
            if (err) return console.log(err);

            res.status(200).json(user);
        });
};

module.exports.getUserByName = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log('get user by name');
    console.log("username called:", req.params.username);
    // \bE\w+
    const rEx_username = new RegExp(req.params.username, 'i');
    User
        .find({'username' : rEx_username}).limit(15)
        .exec(function (err, user) {
            if (err) return console.log(err);

            res.status(200).json(user);
        });
};

module.exports.findByUsername = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log('get user by name');
    console.log("username called:", req.params.username);

    const rEx_username = new RegExp(req.params.username, 'i');
    console.log(rEx_username)
    User
        .findOne({'username' : rEx_username})
        .then(user => {
            console.log("here is your user:",user);
            res.status(200).json(user);
        })
        .catch(error => {
            console.log(`err:${error}, user:${user}`);
        })
};

/**
 * save/update functions from here on
 */

 module.exports.updateProfileImage = function(toUser, newImage, cb) {
     if(!toUser || !newImage) {
         console.log("user or image has not been set");
        return ;
        }
    User.findById(toUser, (err, user) => {
        if (err) return err;

        user.profileImage = newImage;

        user.save((err, returnedUser) => {
            if (err) {
                console.log(err);
                return false;
            };
            cb({'save' : 'imageSaved'});
        });
    });
 }
 