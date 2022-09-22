//models
const { User } = require('../models/user.model');

//utils
const { AppError } = require('../utils/appError.util');

/*check if user exists on db and then sends it in request, if the user does not
exists sends an error*/
const userExists = async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: 'active' } });

    if (!user) {
        return next(new AppError('user not found', 404));
    }

    req.user = user;
    next();
};

module.exports = { userExists };
