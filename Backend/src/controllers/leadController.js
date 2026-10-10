const leadService = require("../services/leadServices");

const createdLead = async (req, res) => {
    try{
        const leadData = {
            ...req.body,
            assignedTo: req.user.id
        };

        const lead = await leadService.createLead(leadData);
        
        return res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create lead"
        });
    }
}

const getLeads = async (req, res) => {
    try{
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));

        const filters = {};

        const allowedFilters = ["status", "source", "company"];

        allowedFilters.forEach((field) => {
            if (req.query[field] !== undefined) {
                filters[field] = req.query[field];
            }
        });

        const result = await leadService.getLeads(page, limit, filters);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch leads"
        });
    }
}

const getLeadById = async (req, res) => {
    try{
         const lead = await leadService.getLeadById(req.params.id);

         if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: lead
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch lead"
        });
    }
};

const updateLead = async (req, res) => {
    try {
        const lead = await leadService.updateLead(
            req.params.id,
            req.body
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update lead"
        });
    }
};

const deleteLead = async (req, res) => {
    try {
        const lead = await leadService.deleteLead(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lead deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete lead"
        });
    }
};

module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
};