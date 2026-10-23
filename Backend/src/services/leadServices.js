
const Lead = require("../Models/Lead");

const createLead = async (leadData) => {
    const lead = await Lead.create(leadData);
    return lead;
};

const getLeads = async (page, limit, filters, userId) => {
    const skip = (page - 1) * limit;

    const safeFilters = {
        ...filters,
        assignedTo: userId
    };

    const leads = await Lead.find(safeFilters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalLeads = await Lead.countDocuments(safeFilters);
    const totalPages = Math.ceil(totalLeads / limit);

    return {
        leads,
        currentPage: page,
        limit,
        totalLeads,
        totalPages
    };
};

const getLeadById = async (id, userId) => {
    const lead = await Lead.findOne({
        _id: id,
        assignedTo: userId
    });

    return lead;
};

const updateLead = async (id, updateData, userId) => {
    const allowedFields = [
        "name",
        "email",
        "phone",
        "company",
        "source",
        "status",
        "notes"
    ];

    const allowedUpdates = {};

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            allowedUpdates[field] = updateData[field];
        }
    });

    if (Object.keys(allowedUpdates).length === 0) {
        const error = new Error("No valid fields provided for update");
        error.statusCode = 400;
        throw error;
    }

    const lead = await Lead.findOneAndUpdate(
        {
            _id: id,
            assignedTo: userId
        },
        allowedUpdates,
        {
            new: true,
            runValidators: true
        }
    );

    return lead;
};

const deleteLead = async (id, userId) => {
    const lead = await Lead.findOneAndDelete({
        _id: id,
        assignedTo: userId
    });

    return lead;
};

module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
};
