const Customer = require('../Models/Customer');

const createCustomer = async (customerData) => {
    const customer = await Customer.create(customerData);

    return customer;
};

const getCustomers = async () => {
    const customers = await Customer.find();

    return customers;
}

const getCustomerById = async (id) => {
    const customer = await Customer.findById(id);

    return customer;
}

const updateCustomer = async (id, updateData) => {
    const customer = await Customer.findByIdAndUpdate(id, updateData, {new: true});

    return customer;
}

const deleteCustomer = async (id) => {
    await Customer.findByIdAndDelete(id);
};

module.exports = { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer };