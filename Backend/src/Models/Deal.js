const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: customer,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    stage: {
        type: String,
        enum: ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"],
        default: "Prospecting"  
    },
    probability: {
        type: Number,
        min: 0,
        max: 100
    },
    expectedCloseDate: {    
        type: Date
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

module.exports = mongoose.model("Deal", dealSchema);