// email, phone_number, license_number, and car_number are unique fields

const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: Number, required: true },
  license_number: { type: String, required: true },
  car_number: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

module.exports = mongoose.model("driver", driverSchema);
