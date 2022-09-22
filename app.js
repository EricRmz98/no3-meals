const express = require('express');

//routers
const { usersRouter } = require('./routes/users.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { reviewsRouter } = require('./routes/reviews.routes');

//init express app
const app = express();

//allow app to receive json data
app.use(express.json());

//define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/restaurants/reviews', reviewsRouter);

//global error handler
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'fail';

    res.status(statusCode).json({
        status,
        message: error.message,
        error,
        stack: error.stack,
    });
});

//catch non existing endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in server`,
    });
});

module.exports = { app };
