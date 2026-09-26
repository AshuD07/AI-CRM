const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    type: {
        type: string,
        enum: ["call", "email", "meeting","demo", "follow-up", "other"],
        required: true
    },
    description: {
        type: string
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    createdBy: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
} ,
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Activity", activitySchema);