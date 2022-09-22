const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError.util');

const validateUserRole = (req, res, next) => {
    const { role } = req.body;

    if (role && !(role === 'admin' || role === 'normal')) {
        return next(new AppError('this user role not exist', 400));
    }

    if (role === '') {
        return next(new AppError('role can not be a void string', 400));
    }

    next();
};

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const message = errorMessages.join('. ');

        return next(new AppError(message, 400));
    }

    next();
};

const createUserValidators = [
    body('name')
        .exists() //check if field exist on request
        .withMessage('name field missing in request')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('email')
        .exists()
        .withMessage('email field missing in request')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isString()
        .withMessage('email must be a string')
        .isEmail()
        .withMessage('invalid email'),
    body('password')
        .exists()
        .withMessage('password field missing in request')
        .isString()
        .withMessage('password must be a string')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
];

const userLoginValidators = [
    body('email')
        .exists()
        .withMessage('email field missing in request')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isString()
        .withMessage('email must be a string')
        .isEmail()
        .withMessage('invalid email'),
    body('password')
        .exists()
        .withMessage('password field missing in request')
        .isString()
        .withMessage('password must be a string')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
];

const updateUserValidators = [
    body('name')
        .exists()
        .withMessage('name field missing in request')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('email')
        .exists()
        .withMessage('email field missing in request')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isString()
        .withMessage('email must be a string')
        .isEmail()
        .withMessage('invalid email'),
    checkValidations,
];

const createRestaurantValidators = [
    body('name')
        .exists()
        .withMessage('name field missing in request')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('address')
        .exists()
        .withMessage('address field missing in request')
        .isString()
        .withMessage('address must be a string')
        .notEmpty()
        .withMessage('address cannot be empty')
        .isLength({ min: 10 })
        .withMessage('address must be at least 10 characters'),
    body('rating')
        .exists()
        .withMessage('rating field missing in request')
        .notEmpty()
        .withMessage('rating cannot be empty')
        .isInt({ min: 1, max: 5 })
        .withMessage('rating must be a integer between 1 and 5'),
    checkValidations,
];

const updateRestaurantValidators = [
    body('name')
        .exists()
        .withMessage('name field missing in request')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('address')
        .exists()
        .withMessage('address field missing in request')
        .isString()
        .withMessage('address must be a string')
        .notEmpty()
        .withMessage('address cannot be empty')
        .isLength({ min: 10 })
        .withMessage('address must be at least 10 characters'),
    checkValidations,
];

const createOrderValidators = [
    body('mealId')
        .exists()
        .withMessage('mealId field missing in request')
        .notEmpty()
        .withMessage('mealId cannot be empty')
        .isInt()
        .withMessage('mealId must be an integer'),
    body('quantity')
        .exists()
        .withMessage('quantity field missing in request')
        .notEmpty()
        .withMessage('quantity cannot be empty')
        .isInt({ min: 1 })
        .withMessage('quantity must be an integer greater than 0'),
    checkValidations,
];

const createUpdateReviewValidators = [
    body('comment')
        .exists()
        .withMessage('comment field missing in request')
        .isString()
        .withMessage('comment must be a string')
        .notEmpty()
        .withMessage('comment cannot be empty')
        .isLength({ min: 5 })
        .withMessage('comment must be at least 10 characters'),
    body('rating')
        .exists()
        .withMessage('rating field missing in request')
        .notEmpty()
        .withMessage('rating cannot be empty')
        .isInt({ min: 1, max: 5 })
        .withMessage('rating must be a integer between 1 and 5'),
    checkValidations,
];

const createUpdateMealValidators = [
    body('name')
        .exists()
        .withMessage('name field missing in request')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 5 })
        .withMessage('name must be at least 10 characters'),
    body('price')
        .exists()
        .withMessage('price field missing in request')
        .notEmpty()
        .withMessage('price cannot be empty')
        .isInt({ min: 1 })
        .withMessage('price must be a integer greater than 0'),
    checkValidations,
];

module.exports = {
    validateUserRole,
    createUserValidators,
    userLoginValidators,
    updateUserValidators,
    createRestaurantValidators,
    updateRestaurantValidators,
    createOrderValidators,
    createUpdateReviewValidators,
    createUpdateMealValidators,
};
