const express = require('express');

//controllers
const {
    createOrder,
    getUserOrders,
    setOrderEnded,
    setOrderCancelled,
} = require('../controllers/orders.controllers');

//middlewares
const {
    authUserSession,
    authUserOrder,
} = require('../middlewares/auth.middlewares');
const {
    mealExistsBody,
    mealExists,
} = require('../middlewares/meals.middlewares');
const { userActiveOrderExists } = require('../middlewares/orders.middlewares');
const {
    createOrderValidators,
} = require('../middlewares/validators.middlewares');

const ordersRouter = express.Router();

//create a new order
ordersRouter.post(
    '/',
    createOrderValidators,
    authUserSession,
    mealExistsBody,
    createOrder
);

//get all user orders
ordersRouter.get('/me', authUserSession, getUserOrders);

//set an order as completed
ordersRouter.patch(
    '/:id',
    authUserSession,
    userActiveOrderExists,
    authUserOrder,
    setOrderEnded
);

//cancel an order
ordersRouter.delete(
    '/:id',
    authUserSession,
    userActiveOrderExists,
    authUserOrder,
    setOrderCancelled
);

module.exports = { ordersRouter };
