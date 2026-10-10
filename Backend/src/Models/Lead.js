const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        trim: true
    },

    company: {
        type: String,
        trim: true
    },

    source: {
        type: String,
        enum: ["website", "advertisement", "referral", "cold_call", "social media","other"],
        default: "other"
    },

    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "converted", "lost"],
        default: "new"
    },
    
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    notes: {
        type: String,
        trim: true
    }
 },
    {
        timestamps: true
    }
);

leadSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Lead", leadSchema);