let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  surname: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  profileImage: {
    type: String,
    required: false,
    default: '../images/user.png'
  },
  address: {
    street: {
      type: String,
      required: false,
      default: ''
    },
    number: {
      type: String,
      required: false,
      default: ''
    },
    city: {
      type: String,
      required: false,
      default: ''
    },
    postaCode: {
      type: String,
      required: false,
      default: ''
    },
    country: {
      type: String,
      required: false,
      default: ''
    },
    full: {
      type: String,
      required: false,
      default: ''
    }
  },
  qualification: {
    type: String,
    required: false,
    default: ''
  },
  phone: {
    type: String,
    required: false,
    default: ''
  },
  token: String,
  expiresIn: String,
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.validJWT = function (clientToken) {
  console.log('this.token:', this.token)
  console.log('clientToken:',clientToken)
  
  return this.token === clientToken;
};

userSchema.methods.generateJwt = function () {
  let expiry = new Date();
  // add 7 days from current date-time
  expiry.setDate(expiry.getDate() + 7);
  this.expiresIn = parseInt(expiry.getTime())

  console.log("it gets here");
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    profileImage: this.profileImage,
    exp: Number(this.expiresIn / 1000),
    /**
     * the server was removing the last 4 characters ( this was transforming the token expiring date in seconds instead of milliseconds ) 
       from the expiring date of the token, this as causing confusion on pwa side.
     * i've removed, this will create problems with iOS app, but since the app is being replaced i wanna use normal time milliseconds length
     */
  }, process.env.MY_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('user', userSchema);


/**
 * getFullYear()	Get the year as a four digit number (yyyy)
 * getMonth()	Get the month as a number (0-11)
 * getDate()	Get the day as a number (1-31)
   getHours()	Get the hour (0-23)
   getMinutes()	Get the minute (0-59)
   getSeconds()	Get the second (0-59)
   getMilliseconds()	Get the millisecond (0-999)
   getTime()	Get the time (milliseconds since January 1, 1970)
   getDay()	Get the weekday as a number (0-6)
 */