// routes/aboutRoutes.js
const express = require('express');
const router = express.Router();

// Route for the about page
router.get('/', (req, res) => {
    res.render('about');
});

module.exports = router;