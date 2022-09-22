const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config('./config.env');

//models
const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError.util');

/*extract the data from the request body, encrypt the password, create the new
user and send it in the response without password*/
const signupUser = async (req, res, next) => {
    try {
        const { name, email, password, status, role } = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            status,
            role,
        });

        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            data: { newUser },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the user instance and body data from the request to update the user
and send it in the response without password*/
const updateUser = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, email } = req.body;

        await user.update({ name, email });

        user.password = undefined;

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

/*extract the user instance from the request to soft delete it updating the
status as deleted*/
const deleteUser = async (req, res, next) => {
    try {
        const { user } = req;

        await user.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        next(error);
    }
};

/*check if an active user with the given email exists, compare the encrypted
passwords and sends a response with the user and token. If the users was not
found or the passwords did not match sends an error*/
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, status: 'active' } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('wrong credentials', 400));
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        user.password = undefined;

        res.status(200).json({
            status: 'success',
            data: { user, token },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { signupUser, userLogin, updateUser, deleteUser };
