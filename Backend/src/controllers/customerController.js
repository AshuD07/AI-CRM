const customerService = require('../services/customerService');

const createCustomer = async (req, res) => {
    const customer = await customerService.createCustomer(req.body);
    
    res.status(201).json(customer);
};

const getCustomers = async (req,res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const filters = {};

    if (req.query.status) {
    filters.status = req.query.status;
    }

    if (req.query.search) {
    filters.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } }
    ];
}

    const result = await customerService.getCustomers(page, limit, filters);

    res.status(200).json(result);
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

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "No fields provided for update"
        });
    }

    const customer = await customerService.updateCustomer(req.params.id, req.body);

    if(!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.status(200).json(customer);
}

const deleteCustomer = async (req, res) => {
    const customer = await customerService.deleteCustomer(req.params.id);

    if(!customer) {
        return res.status(404).json({
            message: "Customer not Found"
        })
    }

    res.status(200).json({
        message: "Customer deleted successfully"
    });
};

module.exports = { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer };