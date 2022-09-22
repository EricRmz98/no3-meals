//models
const { Restaurant } = require('../models/restaurant.model');

//utils
const { AppError } = require('../utils/appError.util');

/*extract the restaurant id from the request params, search for it in the db,
if the restaurant is active send it in the request. If a restaurant was not
found sends an error*/
const restaurantExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findOne({
            where: { id, status: 'active' },
        });

        if (!restaurant) {
            return next(new AppError('restaurant not found', 404));
        }

        req.restaurant = restaurant;
        next();
    } catch (error) {
        next(error);
    }
};

/*extract the restaurant id from the request body, search for an active match in
the db and send it in the request. If a restaurant was not found sends an error */
const restaurantExistRestaurantIdParam = async (req, res, next) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findOne({
            where: { id: restaurantId, status: 'active' },
        });

        if (!restaurant) {
            return next(new AppError('restaurant not found', 404));
        }

        req.restaurant = restaurant;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { restaurantExists, restaurantExistRestaurantIdParam };
