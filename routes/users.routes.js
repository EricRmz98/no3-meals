const express = require('express');

//controllers
const {
    getUserOrders,
    getOrderById,
} = require('../controllers/orders.controllers');
const {
    signupUser,
    userLogin,
    updateUser,
    deleteUser,
} = require('../controllers/users.controllers');

//middlewares
const {
    authUserSession,
    authUserAccount,
    authUserOrder,
} = require('../middlewares/auth.middlewares');
const { orderExists } = require('../middlewares/orders.middlewares');
const { userExists } = require('../middlewares/users.middlewares');
const {
    createUserValidators,
    updateUserValidators,
    validateUserRole,
    userLoginValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

//create a user
usersRouter.post('/signup', createUserValidators, validateUserRole, signupUser);

//user login
usersRouter.post('/login', userLoginValidators, userLogin);

//update user
usersRouter.patch(
    '/:id',
    updateUserValidators,
    userExists,
    authUserSession,
    authUserAccount,
    updateUser
);

//delete user
usersRouter.delete(
    '/:id',
    userExists,
    authUserSession,
    authUserAccount,
    deleteUser
);

//get all user orders
usersRouter.get('/orders', authUserSession, getUserOrders);

//get a user order
usersRouter.get(
    '/orders/:id',
    authUserSession,
    orderExists,
    authUserOrder,
    getOrderById
);

module.exports = { usersRouter };
