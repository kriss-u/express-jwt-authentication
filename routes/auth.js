const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/signup', (req, res, next) => res.send({ 'message': 'Post here for signing up!' }));
router.post('/signup', authController.signup);
router.get('/login', (req, res, next) => res.send({ 'message': 'Post here to login' }));
router.post('/login', authController.login);

module.exports = router;