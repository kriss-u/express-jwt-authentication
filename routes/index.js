const express = require('express');
const router = express.Router();

// GET home page
router.get('/', function (req, res, next) {
    res.send({ title: 'NepCodeX', message: 'Congratulations! You have successfully created a route.', date: new Date() });
});

module.exports = router;