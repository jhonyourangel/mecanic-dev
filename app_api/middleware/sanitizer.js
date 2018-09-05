
module.exports = () => {
    return (req, res, next) => {
        const body = {...req.body}
        Object.keys(body).map(key => {
            req.body[key] = req.sanitize(body[key])
        })       
        next()
    }
};