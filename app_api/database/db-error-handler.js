module.exports = (error, req, res, next) => {
    console.error(error, Object.keys(error))
    if (process.env.LOG_ERRORS) console.error(error)

    let errorObject = {}
    switch (error.code) {
        case 11000:
            errorObject = {
                name: 'Valoare duplicata',
                message: error.message,
                code: error.code
            }
        break
        case undefined:
            errorObject = {
                name: error.name,
                message: error.message,
                code: error.code
            }
        break

        default:
        errorObject = {
            unmappedErrro: 'this is an error that has not been mapped, please check with ion.utale@icloud.com',
            name: error.name,
            message: error.message,
            code: error.code
        }
        break
    }

    res.status(400).json(errorObject)
};