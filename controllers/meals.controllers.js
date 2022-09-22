//models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

//utils
const { AppError } = require('../utils/appError.util');

/*extract the request body data and the restaurant id to create a new meal and
send it in the response*/
const createMeal = async (req, res, next) => {
    try {
        const restaurantId = req.restaurant.id;
        const { name, price } = req.body;

        const newMeal = await Meal.create({ restaurantId, name, price });

        res.status(201).json({
            status: 'success',
            data: { newMeal },
        });
    } catch (error) {
        next(error);
    }
};

/*search for all the active meals that belows to an active restaurant in db
and sends it in the response*/
const getActiveMeals = async (req, res, next) => {
    try {
        const meals = await Meal.findAll({
            where: { status: 'active' },
            /*the below where: {status: 'active'}
            is to ignore meals from deleted restaurants*/
            include: { model: Restaurant, where: { status: 'active' } },
        });

        res.status(200).json({
            status: 'success',
            data: { meals },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the meal id from the request params, search for the meal in db and,
send a response with the meal. If the meas does not exists send an error*/
const getMealById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const meal = await Meal.findOne({
            where: { id, status: 'active' },
            include: { model: Restaurant, where: { status: 'active' } },
        });

        if (!meal) {
            return next(new AppError('meal not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { meal },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the request body data and meal instance to update the meal and
send it in the response*/
const updateMeal = async (req, res, status) => {
    try {
        const { meal } = req;
        const { name, price } = req.body;

        await meal.update({ name, price });

        res.status(200).json({
            status: 'success',
            data: { meal },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the meal instance to update the meal status as deleted.
it send a response without json data*/
const deleteMeal = async (req, res, next) => {
    try {
        const { meal } = req;

        await meal.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMeal,
    getActiveMeals,
    getMealById,
    updateMeal,
    deleteMeal,
};
