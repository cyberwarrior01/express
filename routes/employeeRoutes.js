const express = require('express');
const router = express.Router();
// const express = require('express');
// const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/employeeController');

const { registerEmployee, loginEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.get('/', getAllEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
