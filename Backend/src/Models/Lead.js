const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    source: {
        type: String,
        enum: ["Website", "Advertisement", "Referral", "Cold_Call", "Social Media"]
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
        default: "New"
    },
    
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
 },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Lead", leadSchema);