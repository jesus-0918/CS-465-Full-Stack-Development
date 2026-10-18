const express = require('express');
const router = express.Router();
const passport = require('passport');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// JWT authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(requireAuth, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode);

// Administrator authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;