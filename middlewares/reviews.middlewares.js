//models
const { Review } = require('../models/review.model');

//utils
const { AppError } = require('../utils/appError.util');

/*check if a review exist in db comparing with the id from the request params,
if the review not exists send an error*/
const reviewExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findOne({
            where: { id, status: 'active' },
        });

        if (!review) {
            return next(new AppError('review not found', 404));
        }

        req.review = review;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { reviewExists };
