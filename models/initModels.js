const { Restaurant } = require('./restaurant.model');
const { Review } = require('./review.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { User } = require('./user.model');

const initModels = () => {
    //1 restaurant <---> M reviews
    Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
    Review.belongsTo(Restaurant);

    //1 restaurant <---> M meals
    Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
    Meal.belongsTo(Restaurant);

    //1 meal <---> 1 order
    Meal.hasOne(Order, { foreignKey: 'mealId' });
    Order.belongsTo(Meal);

    //1 user <---> M orders
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User);

    //1 user <---> M reviews
    User.hasMany(Review, { foreignKey: 'userId' });
    Review.belongsTo.User;
};

module.exports = { initModels };
