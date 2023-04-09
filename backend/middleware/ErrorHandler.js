const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../error/CustomAPIError')


const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCodes).json({msg:err.message})
    }
    
    let customError = {
        StatusCodes: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.msg || ('Something went wrong. Please try again later')
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
        customError.StatusCodes = 400;
    }

    if (err.code && err.code === 11000) {
        customError.msg = `${Object.keys(err.keyValue)} already in use, Please use another ${Object.keys(err.keyValue)}`
        customError.StatusCodes = 400
    }

    return res.status(customError.StatusCodes).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware