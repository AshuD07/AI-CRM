const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true,
    },
    phone: {
        type: string
    },
    company: {
        type: string 
    },
    status: {
        type: string,
        enum: ["active", "inactive"],
        default: "active"
    }
},
   { 
    timestamps: true
   }
);

module.exports = mongoose.model("Customer", customerSchema);