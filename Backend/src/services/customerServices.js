const Customer = require('../models/Customer');

const createCustomer = async (customerData) => {
    const customer = await Customer.create(customerData);

    return customer;
};

const getCustomers = async () => {
    const customers = await Customer.find();

    return customers;
}

const getCustomerById = async () => {
    const customer = await Customer.findById(id);

    return customers;
}

module.exports = { createCustomer, getCustomers, getCustomerById };