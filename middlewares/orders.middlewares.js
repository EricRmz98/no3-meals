//models
const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');

//utils
const { AppError } = require('../utils/appError.util');

/*extract the order id from the request params, search for the id order in db,
if order is active send it to the request. If order was not found or is not
active sends an error*/
const userActiveOrderExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({ where: { id } });

        if (!order) {
            return next(new AppError('order not found', 404));
        }

        if (order.status !== 'active') {
            return next(new AppError('this order has already ended', 400));
        }

        req.order = order;
        next();
    } catch (error) {
        next(error);
    }
};

/*extract the order id from the request params, check for a match in the db
and send it in the request. If no order found send an error*/
const orderExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            where: { id },
            include: { model: Meal, include: { model: Restaurant } },
        });

        if (!order) {
            return next(new AppError('order not found', 404));
        }

        req.order = order;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { userActiveOrderExists, orderExists };
