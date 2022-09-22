const express = require('express');

//controllers
const {
    createRestaurant,
    getActiveRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
} = require('../controllers/restaurants.controllers');

//middlewares
const {
    authUserSession,
    authAdmin,
} = require('../middlewares/auth.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const {
    createRestaurantValidators,
    updateRestaurantValidators,
} = require('../middlewares/validators.middlewares');

const restaurantsRouter = express.Router();

//create a new restaurant
restaurantsRouter.post(
    '/',
    createRestaurantValidators,
    authUserSession,
    createRestaurant
);

//get all restaurants
restaurantsRouter.get('/', getActiveRestaurants);

//get a restaurant
restaurantsRouter.get('/:id', getRestaurantById);

//update a restaurant
restaurantsRouter.patch(
    '/:id',
    updateRestaurantValidators,
    authUserSession,
    authAdmin,
    restaurantExists,
    updateRestaurant
);

//delete restaurant
restaurantsRouter.delete(
    '/:id',
    authUserSession,
    authAdmin,
    restaurantExists,
    deleteRestaurant
);

module.exports = { restaurantsRouter };
