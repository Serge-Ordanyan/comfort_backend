const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {upload} = require('../middleware/upload');
const { createProduct } = require("../controllers/creteProductController");


router.post('/productes', (req, res) => {
    console.log('Uploaded profile:', req.file);
    res.json({
      success: 1,
      profile_url: `http://localhost:4000/profile/${req.file.filename}`,
    });
  });

module.exports = router;