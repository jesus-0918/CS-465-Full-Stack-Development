const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
    const trips = await Trip
        .find({})
        .exec();

    if (!trips) {
        return res
            .status(404)
            .json({ "message": "trips not found" });
    }

    return res
        .status(200)
        .json(trips);
};

module.exports = {
    tripsList
};