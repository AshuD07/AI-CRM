const Lead = require("../Models/Lead");

const createLead = async (leadData) => {
    const lead = await Lead.create(leadData);
    return lead;
};

const getLeads = async (page, limit, filters) => {
    const skip = (page - 1) * limit;

    const leads = await Lead.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalLeads = await Lead.countDocuments(filters);
    const totalPages = Math.ceil(totalLeads / limit);

    return {
        leads, 
        currentPage: page,
        limit,
        totalLeads,
        totalPages
    };
};

const getLeadById = async (id) => {
    const lead = await Lead.findById(id);
    return lead;
};

const updateLead = async (id, updateData) => {
    const allowedFields = [
        "name","email","phone","company","source","status","notes","assignedTo"
    ];

    const allowedUpdates = {};

    allowedFields.forEach((field) => {
        if(updateData[field] !== undefined) {
            allowedUpdates[field] = updateData[field];
        }
    });

const lead = await Lead.findByIdAndUpdate(
    id, allowedUpdates,
    {
        new: true,
        runValidators: true
    }
);
    return lead;
};

const deleteLead = async (id) => {
    const lead = await Lead.findByIdAndDelete(id);
    return lead;
};

module.exports = {
    createLead, getLeads, getLeadById, updateLead, deleteLead
};


