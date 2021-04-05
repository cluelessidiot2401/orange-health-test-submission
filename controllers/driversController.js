const { processError } = require("../utils/miscellaneous");
const Driver = require("../models/Driver");
const uniqueRandom = require("unique-random");

const random = uniqueRandom(1, 10000000);

let registerDriver = async (req, res) => {
  // Please ensure that the email, phone_number, license_number, and car_number are unique fields

  // Query driver based on email of current
  try {
    const driver =
      (await Driver.findOne({
        email: req.body.email,
      })) ||
      (await Driver.findOne({
        phone_number: req.body.phone_number,
      })) ||
      (await Driver.findOne({
        license_number: req.body.license_number,
      })) ||
      (await Driver.findOne({
        car_number: req.body.car_number,
      }));

    if (driver !== null) {
      // Driver exists - 400
      return res.status(400).send({
        status: "failure",
        success: false,
        reason: "Driver with the same details already exists",
      });
    } else if (Number(req.body.phone_number).toString().length !== 10) {
      // Driver exists - 400
      return res.status(400).send({
        status: "failure",
        success: false,
        reason: "Phone number should be 10 digits",
      });
    }
    const createdDriver = await Driver.create({
      id: random(),
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      license_number: req.body.license_number,
      car_number: req.body.car_number,
    });

    const {
      id,
      name,
      email,
      phone_number,
      license_number,
      car_number,
    } = createdDriver;

    return res.status(201).send({
      id,
      name,
      email,
      phone_number,
      license_number,
      car_number,
    });
  } catch (error) {
    return processError(error, res);
  }
};

let getAll = async (req, res) => {
  try {
    const drivers = await Driver.find();
    return res
      .status(200)
      .send({ success: true, count: drivers.length, data: drivers });
  } catch (error) {
    return processError(error, res);
  }
};

let shareLocation = async (req, res) => {
  try {
    // const driver = await Driver.findOne({ id: req.params.id });
    // if (!driver) {
    //   // not found - 404
    //   return res.status(404).send({
    //     status: "failure",
    //     success: false,
    //     reason: "Driver with the id does not exist",
    //   });
    // }

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
    const resp = await Driver.updateOne(
      { id: req.params.id },
      { latitude: req.body.latitude, longitude: req.body.longitude }
    );

    if (resp.n !== 1 || resp.ok !== 1) {
      // not found - 404
      return res.status(404).send({
        status: "failure",
        success: false,
        reason: "Driver with the id does not exist",
      });
    }

    return res.status(202).send({
      status: "success",
      success: true,
    });
  } catch (error) {
    return processError(error, res);
  }
};

module.exports = {
  registerDriver,
  shareLocation,
  getAll,
};
