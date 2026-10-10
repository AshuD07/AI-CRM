const Customer = require('../Models/Customer');

const createCustomer = async (customerData) => {
    const customer = await Customer.create(customerData);

    return customer;
};

const getCustomers = async (page, limit, filters) => {
    const skip = (page - 1) * limit;
    const customers = await Customer.find(filters)
                                    .sort({createdAt: -1})
                                    .skip(skip)
                                    .limit(limit);

    const totalCustomers = await Customer.countDocuments(filters);
    const totalPages = Math.ceil(totalCustomers / limit);
    return {
        customers,
        currentPage: page,
        limit,
        totalCustomers,
        totalPages
    };
}

const getCustomerById = async (id) => {
    const customer = await Customer.findById(id);

    return customer;
}

const updateCustomer = async (id, updateData) => {

    const allowedFields = [
        "name",
        "email",
        "phone",
        "company",
        "status",
        "assignedTo"
    ];

    const allowedUpdates = {};

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            allowedUpdates[field] = updateData[field];
        }
    });

    const customer = await Customer.findByIdAndUpdate(id, allowedUpdates, {new: true, runValidators: true});

    return customer;
}

const deleteCustomer = async (id) => {
    const customer = await Customer.findByIdAndDelete(id);
    return customer;
};

module.exports = { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer };