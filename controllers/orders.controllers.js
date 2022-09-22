//models
const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');

/*create a new order with the user and meal data in request and send a
response with the new order*/
const createOrder = async (req, res, next) => {
    try {
        const { mealId, quantity } = req.body;
        const userId = req.sessionUser.id;
        const totalPrice = quantity * req.meal.price;

        const newOrder = await Order.create({
            mealId,
            userId,
            quantity,
            totalPrice,
        });

        res.status(201).json({
            status: 'success',
            data: { newOrder },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the id of the logged in user from the request, get all the orders
of the user in db and send a response with them*/
const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.sessionUser.id;

        const orders = await Order.findAll({
            where: { userId },
            include: {
                model: Meal,
                include: { model: Restaurant },
            },
        });

        res.status(200).json({
            status: 'success',
            data: { orders },
        });
    } catch (error) {
        next(error);
    }
};

/*send a response with the order id the request*/
const getOrderById = async (req, res, next) => {
    try {
        const { order } = req;

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

/*extract te order data form the request, set the order status as ended
and send a response with te updated order*/
const setOrderEnded = async (req, res, next) => {
    try {
        const { order } = req;

        await order.update({ status: 'ended' });

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the order data from the request, set the order as canceled and
send a response with the updated order*/
const setOrderCancelled = async (req, res, next) => {
    try {
        const { order } = req;

        await order.update({ status: 'cancelled' });

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    setOrderEnded,
    setOrderCancelled,
    getOrderById,
};
