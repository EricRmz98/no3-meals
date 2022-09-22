//models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

//utils
const { AppError } = require('../utils/appError.util');

/*extract the request body data to create a new restaurant and send it in the
response*/
const createRestaurant = async (req, res, next) => {
    try {
        const { name, address, rating } = req.body;

        const newRestaurant = await Restaurant.create({
            name,
            address,
            rating,
        });

        res.status(201).json({
            status: 'success',
            newRestaurant,
        });
    } catch (error) {
        next(error);
    }
};

/*search in db for all the active restaurants and send them in the response*/
const getActiveRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: { status: 'active' },
            include: {
                model: Review,
                required: false,
                where: { status: 'active' },
            },
        });

        res.status(200).json({
            status: 'success',
            data: { restaurants },
        });
    } catch (error) {
        next(error);
    }
};

/*send a response with the restaurant that match with the id from the request
params, if a restaurant is not found or is deleted sends an error response*/
const getRestaurantById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findOne({
            where: { id, status: 'active' },
            include: {
                model: Review,
                required: false,
                where: { status: 'active' },
                attributes: { exclude: ['status'] },
            },
        });

        if (!restaurant) {
            return next(new AppError('restaurant not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { restaurant },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the request body data and restaurant instance, update the restaurant 
data and send it in a response*/
const updateRestaurant = async (req, res, next) => {
    try {
        const { restaurant } = req;
        const { name, address } = req.body;

        await restaurant.update({ name, address });

        res.status(200).json({
            status: 'success',
            data: { restaurant },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the restaurant instance to soft delete it setting it status as 
deleted*/
const deleteRestaurant = async (req, res, next) => {
    try {
        const { restaurant } = req;

        await restaurant.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {}
};

module.exports = {
    createRestaurant,
    getActiveRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
};
