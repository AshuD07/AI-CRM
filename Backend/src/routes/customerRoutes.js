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
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const customerQuerySchema = require("../Validators/customerQueryValidator");

const router = express.Router();

router.post("/", protect, validate(createCustomerSchema), createCustomer);
router.patch("/:id",protect, validate(updateCustomerSchema), updateCustomer);

router.get('/', protect,  validate(customerQuerySchema, "query"), getCustomers);
router.get('/:id',protect,  validateObjectId, getCustomer);
router.delete("/:id", protect, requireRole("admin"), deleteCustomer);

module.exports = router;