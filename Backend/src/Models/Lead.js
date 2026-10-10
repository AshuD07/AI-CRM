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
        enum: ["Website", "Advertisement", "Referral", "Cold_Call", "Social Media","other"],
        default: "other"
    },

    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
        default: "New"
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