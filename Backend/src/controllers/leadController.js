
const mongoose = require("mongoose");
const leadService = require("../services/leadServices");

const handleError = (res, error, action) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }

    if (error.name === "ValidationError" ||
        error.name === "CastError" ||
        error.name === "BSONError") {
        return res.status(400).json({
            success: false,
            message: "Invalid input or lead ID"
        });
    }

    console.error(`Lead ${action} error:`, error);

    return res.status(500).json({
        success: false,
        message: `Failed to ${action} lead`
    });
};

const createLead = async (req, res) => {
    try {
        const leadData = {
            ...req.body,
            assignedTo: req.user.userId
        };

        const lead = await leadService.createLead(leadData);

        return res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead
        });
    } catch (error) {
        return handleError(res, error, "create");
    }
};

const getLeads = async (req, res) => {
    try {
        const rawPage = req.query.page;
        const rawLimit = req.query.limit;

        const page = rawPage === undefined ? 1 : Number(rawPage);
        const limit = rawLimit === undefined ? 10 : Number(rawLimit);

        if (
            !Number.isInteger(page) || page < 1 ||
            !Number.isInteger(limit) || limit < 1 || limit > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Page must be a positive integer and limit must be between 1 and 100"
            });
        }

        const filters = {};
        const allowedFilters = ["status", "source", "company"];

        allowedFilters.forEach((field) => {
            if (req.query[field] !== undefined) {
                filters[field] = req.query[field];
            }
        });

        const result = await leadService.getLeads(
            page,
            limit,
            filters,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(res, error, "fetch");
    }
};

const getLeadById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lead ID"
            });
        }

        const lead = await leadService.getLeadById(
            req.params.id,
            req.user.userId
        );

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
        return handleError(res, error, "fetch");
    }
};

const updateLead = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lead ID"
            });
        }

        const lead = await leadService.updateLead(
            req.params.id,
            req.body,
            req.user.userId
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
        return handleError(res, error, "update");
    }
};

const deleteLead = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lead ID"
            });
        }

        const lead = await leadService.deleteLead(
            req.params.id,
            req.user.userId
        );

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
        return handleError(res, error, "delete");
    }
};

module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
};
