const express = require("express");
const router = express.Router();
const {
  registerDriver,
  getAll,
  shareLocation,
} = require("../controllers/driversController");

// Register a driver
// POST /api/v1/driver/register/
router.post("/register", registerDriver);

// Share Driver Location
// POST /api/v1/driver/:id/sendLocation/
router.post("/:id/sendLocation", shareLocation);

router.get("/", getAll);

module.exports = router;
