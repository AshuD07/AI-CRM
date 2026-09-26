const customerService = require('../services/customerService');

const createCustomer = async (req, res) => {
    const customer = await customerService.createCustomer(req.body);
    
    res.status(201).json(customer);
};

const getCustomers = async (req,res) => {
    const customers = await customerService.getCustomer();

    res.status(200).json(customers);
}

const getCustomer = async (req, res) => {
    const customer = await customerService.getCustomerById(req.params.id);

    res.status(200).json(customer);
}

module.exports = { createCustomer, getCustomers, getCustomer };