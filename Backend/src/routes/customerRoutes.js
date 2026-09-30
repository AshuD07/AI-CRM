const express = require('express');

const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

const { createCustomerSchema, updateCustomerSchema } = require("../Validators/customerValidator");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId")

const router = express.Router();

router.post("/", validate(createCustomerSchema), createCustomer);
router.patch("/:id", validate(updateCustomerSchema), updateCustomer);

router.get('/', getCustomers);
router.get('/:id', validateObjectId, getCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;