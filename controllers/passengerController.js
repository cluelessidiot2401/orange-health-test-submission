const { processError, haversine } = require("../utils/miscellaneous");
const Driver = require("../models/Driver");

let getNearbyCabs = async (req, res) => {
  try {
    if (
      req.body.latitude === "" ||
      req.body.longitude === "" ||
      isNaN(Number(req.body.latitude)) ||
      isNaN(Number(req.body.longitude))
    ) {
      return res.status(400).send({
        status: "failure",
        success: false,
        reason: JSON.stringify({
          name: "ValidationError",
          details:
            "Either one or both of the fields are not valid - latitude, longitude",
        }),
      });
    }

    const available_cabs = [];

    const drivers = await Driver.find();

    if (!drivers || drivers.length === 0) {
      // not found - 404
      return res.status(404).send({
        status: "failure",
        success: false,
        reason: "No drivers found",
      });
    }

    drivers.forEach((driver) => {
      let distance = haversine(
        req.body.latitude,
        req.body.longitude,
        driver.latitude,
        driver.longitude
      );
      let driverDetails = {};
      driverDetails.name = driver.name;
      driverDetails.car_number = driver.car_number;
      driverDetails.phone_number = driver.phone_number;

      if (distance <= 4) {
        available_cabs.push(driverDetails);
      }
    });

    if (available_cabs.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No cabs available!",
      });
    }
    return res.status(200).send({
      success: true,
      count: available_cabs.length,
      available_cabs,
    });
  } catch (error) {
    return processError(error, res);
  }
};

module.exports = {
  getNearbyCabs,
};
