var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports.profileRead = function (req, res) {
    console.log('auth succeded');
    console.log('Req.header : ' + req.payload._id);

    // TODO: implement serve side grants authorization
    if (!req.payload._id) { 
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                res.status(200).json(user);
            });
    }
};

module.exports.profileSave = function (req, res) {
    if (!req.body._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        console.log('should search for user');
        User.findById(req.body._id, (err, user) => {
            if (err) return err;

            // body in this case is the user
            var aUser = new User(req.body);

            user.name = aUser.name;
            user.email = aUser.email;
            user.profileImage = aUser.profileImage;
            user.address = aUser.address;
            user.qualification = aUser.qualification;
            user.phone = aUser.phone;

            user.save((err, returnedUser) => {
                if (err) {
                    console.log(err);
                    return false;
                };

                res.status(200).json(returnedUser);
            });
        });
    }
};