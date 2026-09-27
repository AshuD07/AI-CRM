const customerService = require('../services/customerService');

const createCustomer = async (req, res) => {
    const customer = await customerService.createCustomer(req.body);
    
    res.status(201).json(customer);
};

const getCustomers = async (req,res) => {
    const customers = await customerService.getCustomers();

    res.status(200).json(customers);
}

const getCustomer = async (req, res) => {
    const customer = await customerService.getCustomerById(req.params.id);

    if (!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.status(200).json(customer);
}

const updateCustomer = async (req, res) => {
    const customer = await customerService.updateCustomer(req.params.id, req.body);

    res.status(200).json(customer);
}

const deleteCustomer = async (req, res) => {
    await customerService.deleteCustomer(req.params.id);

    res.status(200).json({
        message: "Customer deleted successfully"
    });
};

module.exports = { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer };