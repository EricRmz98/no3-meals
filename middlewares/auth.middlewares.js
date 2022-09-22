const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//models
const { User } = require('../models/user.model');

//utils
const { AppError } = require('../utils/appError.util');

/*check if the request header has data, extract the token and decrypt
it to extract the user id, check if an active user match with the id and 
allow access to the next middleware. If there is no data in the request 
header or the user not exists send an error*/
const authUserSession = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('invalid session', 403));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            where: { id: decoded.id, status: 'active' },
        });

        if (!user) {
            return next(new AppError('the session owner is not active', 403));
        }

        req.sessionUser = user;
        next();
    } catch (error) {
        next(error);
    }
};

/*check if the token user id and the param user id match*/
const authUserAccount = (req, res, next) => {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
        return next(
            new AppError('you do not have permissions for this account', 403)
        );
    }

    next();
};

/*check if the user has admin permissions*/
const authAdmin = (req, res, next) => {
    const { role } = req.sessionUser;

    if (role !== 'admin') {
        return next(new AppError('user do not have admin permissions', 403));
    }

    next();
};

/*check if the review belows to the user*/
const authUserReview = (req, res, next) => {
    const userId = req.sessionUser.id;
    const reviewUserId = req.review.userId;

    if (userId !== reviewUserId) {
        return next(
            new AppError('this review do not belows to this user', 400)
        );
    }

    next();
};

/*check if the order belows to the user*/
const authUserOrder = (req, res, next) => {
    const userId = req.sessionUser.id;
    const orderUserId = req.order.userId;

    if (userId !== orderUserId) {
        return next(new AppError('yo are not the owner of this order', 403));
    }

    next();
};

module.exports = {
    authUserSession,
    authUserAccount,
    authAdmin,
    authUserReview,
    authUserOrder,
};
