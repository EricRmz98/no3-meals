//models
const { Meal } = require('../models/meal.model');

//utils
const { AppError } = require('../utils/appError.util');

/*extract the meal id from the request params and search in db for a match,
if the meal was not found send an error*/
const mealExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const meal = await Meal.findOne({ where: { id, status: 'active' } });

        if (!meal) {
            return next(new AppError('meal not found', 404));
        }

        req.meal = meal;
        next();
    } catch (error) {
        next(error);
    }
};

/*extract the meal id from the request body and search in db for a match,
if the meal was not found send an error*/
const mealExistsBody = async (req, res, next) => {
    try {
        const { mealId } = req.body;

        const meal = await Meal.findOne({
            where: { id: mealId, status: 'active' },
        });

        if (!meal) {
            return next(new AppError('meal not found', 404));
        }

        req.meal = meal;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { mealExists, mealExistsBody };
