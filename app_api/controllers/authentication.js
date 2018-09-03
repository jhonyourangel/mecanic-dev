var passport = require('passport');
var mongoose = require('mongoose');

var User = mongoose.model('user');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {

    var newuser = new User();

    newuser.name = req.body.name || '';
    newuser.surname = req.body.surname || '';
    newuser.email = req.body.email;
    newuser.username = req.body.email.split('@')[0];

    
    newuser.setPassword(req.body.password);
    newuser.token = newuser.generateJwt();

    newuser.save()
    .then((dbRes) => {
        res.status(200).json(newuser);
    }).catch(function(error) {
        console.error("error while trying to save the new user", error);
        res.status(405).json(error);
    });

    // newuser.save().then((dbRes) => { console.log('new user is saved to the db') });
};

module.exports.login = function (req, res) {
    if(!req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }

    console.log("log in called:", req.body.email, ": ", req.body.password)
    passport.authenticate('local', function (err, user, info) {
        // If Passport throws/catches an error
        console.log(info)
        if (err) {
            res.status(404).json(err);
            return;
        }

        let aUser = user
        if (aUser) {
            // add the token to the aUser in a hard way
            aUser.token = aUser.generateJwt();
            aUser.save()
            res.status(200).json(aUser);
        } else {
            // If aUser is not found
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.reauth = async function (req, res) {

    const user = await User.findOne({'email' : req.body.email})
    const bearer = req.get('authorization')
    const token = bearer.split(' ')[1]
    console.log(bearer)

    if (user.validJWT(token)) {
        user.token = user.generateJwt()
        user.save()
        res.status(200).json(user)
    } else {
        res.status(403).json({'msg' : 'the token is not valid'})
    }    
};