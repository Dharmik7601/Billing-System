const CustomAPIError = require('./CustomAPIError')

const { StatusCodes } = require('http-status-codes')

class UnauthorizedError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.StatusCodes = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthorizedError