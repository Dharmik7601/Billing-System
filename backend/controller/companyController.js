const Company = require('../model/companyModel')
const { StatusCodes } = require('http-status-codes') 

const createCompanyDetails = async (req, res) => {
    const company = await Company.create(req.body)
    res.status(StatusCodes.CREATED).json({company})
}

module.exports = {createCompanyDetails}