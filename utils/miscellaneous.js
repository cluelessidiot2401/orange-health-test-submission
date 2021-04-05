let processError = (error, res) => {
  console.error(error);
  if (error.name === "ValidationError") {
    return res.status(400).send({
      status: "failure",
      success: false,
      reason: JSON.stringify(error),
    });
  }
  return res.status(500).send({
    status: "failure",
    success: false,
    reason: JSON.stringify(error),
  });
};

let haversine = (lat1, lon1, lat2, lon2) => {
  // distance between latitudes
  // and longitudes
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radians
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  let radiusOfTheEarth = 6371;
  let c = 2 * Math.asin(Math.sqrt(a));
  return radiusOfTheEarth * c;
};

module.exports = {
  processError,
  haversine,
};
