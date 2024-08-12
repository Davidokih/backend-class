const express = require('express');

const { createSpecification } = require('../controller/specificationController');
const router = express.Router();

router.route('/:productId').post(createSpecification);

module.exports = router;