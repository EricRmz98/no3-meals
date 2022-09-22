const express = require('express');

//controllers
const {
    createMeal,
    getActiveMeals,
    getMealById,
    updateMeal,
    deleteMeal,
} = require('../controllers/meals.controllers');

//middlewares
const {
    authUserSession,
    authAdmin,
} = require('../middlewares/auth.middlewares');
const { mealExists } = require('../middlewares/meals.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const {
    createUpdateMealValidators,
} = require('../middlewares/validators.middlewares');

const mealsRouter = express.Router();

//create a new meal
mealsRouter.post(
    '/:id',
    createUpdateMealValidators,
    authUserSession,
    restaurantExists,
    createMeal
);

//get all meals
mealsRouter.get('/', getActiveMeals);

//get a meal
mealsRouter.get('/:id', getMealById);

//update meal
mealsRouter.patch(
    '/:id',
    createUpdateMealValidators,
    authUserSession,
    authAdmin,
    mealExists,
    updateMeal
);

//delete meal
mealsRouter.delete('/:id', authUserSession, authAdmin, mealExists, deleteMeal);

module.exports = { mealsRouter };
