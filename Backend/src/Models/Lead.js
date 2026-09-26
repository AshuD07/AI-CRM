const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    email: {
        type: string
    },
    phone: {
        type: string
    },
    company: {
        type: string
    },
    source: {
        type: string,
        enum: ["Website", "Advertisement", "Referral", "Cold_Call", "Social Media"]
    },
    status: {
        type: string,
        enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
        default: "new"
    },
    
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
 },
    {
        timestamps: true
    }
);

module.exports = mongoose,model("Leads", leadSchema);