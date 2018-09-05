const jwt = require('jsonwebtoken')
module.exports.decodeToken = (bearier) => {
    const token = bearier !== undefined ?
        bearier.split(' ')[1] : ''
    return jwt.verify(token, process.env.MY_SECRET);
}