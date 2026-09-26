const express = require('express');

const { createCustomer } = require('../controllers/customerController');

const router = express.Router();

router.post('/', createCustomer);
router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.patch('/:id', updateCustomer);

module.exports = router;