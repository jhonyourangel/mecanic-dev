var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('user');
var async = require('async')
var fs = require('fs');
var path = require('path')

/**
 * first crete the userlist array then uncomment the create line
 */

var userlist = []

function userObject(csv) {
    return {
        "name": csv[0],
        "surname": csv[1],
        "username": `${csv[0]}.${csv[1]}`,
        "email": csv[3],
        "password": `${csv[0]}.${csv[1]}`,
    }
}

fs.readFile(path.join(__dirname, '/Connections.csv'), 'utf8', function (err, contents) {
    console.log(__dirname)
    console.log(err);
    parseCSV(contents)
});

function parseCSV(csvStr) {
    userlist = []
    const csv = require('csvtojson')
    csv({
            noheader: false
        })
        .fromString(csvStr)
        .on('csv', (csvRow) => { // this func will be called 3 times
            // console.log(csvRow) // => [1,2,3] , [4,5,6]  , [7,8,9]
            userlist.push(userObject(csvRow))
        })
        .on('done', () => {
            //parsing finished
            console.log("start creating the users")
            create()
        })
}

function create() {
    //console.log(user);
    var left = userlist.length
    console.log(left)
    async.eachLimit(
        userlist,
         5, // limit
        function (user, callback) {
            console.log('Processing users  left:', left--);
            createUsers(user.name, user.surname, user.username, user.email, user.password, callback);
        },
        function (err) {
            if (err) {
                console.log('Failed to process');
            } else {
                console.log('All files have been processed successfully');
            }
        }
    );
}


function createUsers(name, surname, username, email, password, callBack) {
    var user = new User();

    user.name = name;
    user.surname = surname;
    user.username = username;
    user.email = email;
    user.setPassword(password);

    if (user.name == undefined ||
        user.surname == undefined ||
        user.username == undefined ||
        user.email == undefined ||
        user.hash == undefined) {
        console.log(" at least one is undefined: ", user.hash);
    }

    // this checks if any of the property is empty
    // is not a fail safe is just a simple while developing show posible bad data
    if (user.name == "" ||
        user.surname == "" ||
        user.username == "" ||
        user.email == "" ||
        user.hash == "") {
        console.log(" at least one is empty", user);
    }

    user.save(function (err) {
        if (err) {
            console.log(err);
        }
        var token;
        token = user.generateJwt();
        console.log(`user ${user.username}`);
        callBack()
    });
}
