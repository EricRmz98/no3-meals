const express = require('express');

//controllers
const {
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviews.controllers');

//middlewares
const {
    authUserSession,
    authUserReview,
} = require('../middlewares/auth.middlewares');
const {
    restaurantExistRestaurantIdParam,
} = require('../middlewares/restaurants.middlewares');
const { reviewExists } = require('../middlewares/reviews.middlewares');
const {
    createUpdateReviewValidators,
} = require('../middlewares/validators.middlewares');

const reviewsRouter = express.Router();

//create a new review
reviewsRouter.post(
    '/:restaurantId',
    createUpdateReviewValidators,
    authUserSession,
    restaurantExistRestaurantIdParam,
    createReview
);

//update a review
reviewsRouter.patch(
    '/:id',
    createUpdateReviewValidators,
    authUserSession,
    reviewExists,
    authUserReview,
    updateReview
);

//delete a review
reviewsRouter.delete(
    '/:id',
    authUserSession,
    reviewExists,
    authUserReview,
    deleteReview
);

module.exports = { reviewsRouter };
