const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
    const trips = await Trip
        .find({})
        .exec();

    if (!trips) {
        return res
            .status(404)
            .json({ "message": "Trips not found" });
    }

    return res
        .status(200)
        .json(trips);
};

const tripsFindByCode = async (req, res) => {
    const trip = await Trip
        .findOne({ code: req.params.tripCode })
        .exec();

    if (!trip) {
        return res
            .status(404)
            .json({ "message": "Trip not found" });
    }

    return res
        .status(200)
        .json(trip);
};

const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip
};