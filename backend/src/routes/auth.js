const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
    body('email')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number'),
    body('firstName')
        .trim()
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('lastName')
        .trim()
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
];

const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;