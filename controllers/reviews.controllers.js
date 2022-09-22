//models
const { Review } = require('../models/review.model');

/*extract the user id, restaurant id and body data from request to create a
new review and send it in the response*/
const createReview = async (req, res, next) => {
    try {
        const userId = req.sessionUser.id;
        const restaurantId = req.restaurant.id;
        const { comment, rating } = req.body;

        const newReview = await Review.create({
            userId,
            restaurantId,
            comment,
            rating,
        });

        res.status(201).json({
            status: 'success',
            data: { newReview },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the review instance and body data from request to update the review
and send it in the response*/
const updateReview = async (req, res, next) => {
    try {
        const { review } = req;
        const { comment, rating } = req.body;

        await review.update({ comment, rating });

        res.status(200).json({
            status: 'success',
            data: { review },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the review instance from request, update the review status as deleted
and send a response without json data*/
const deleteReview = async (req, res, next) => {
    try {
        const { review } = req;

        await review.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        next(error);
    }
};
module.exports = { createReview, updateReview, deleteReview };
