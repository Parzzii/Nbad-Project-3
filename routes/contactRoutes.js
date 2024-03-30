// routes/contactRoutes.js
const express = require('express');
const router = express.Router();

// Route for the contact page
router.get('/', (req, res) => {
    res.render('contact');
});

module.exports = router;