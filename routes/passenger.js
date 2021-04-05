const express = require("express");
const router = express.Router();
const { getNearbyCabs } = require("../controllers/passengerController");

// Get Nearby Cabs
//  POST /api/v1/passenger/available_cabs/
router.post("/available_cabs", getNearbyCabs);

// Share Driver Location
// POST /api/v1/driver/:id/sendLocation/

module.exports = router;
