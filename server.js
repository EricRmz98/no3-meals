const { app } = require('./app');
const { initModels } = require('./models/initModels');

//utils
const { db } = require('./utils/database.util');

const startServer = async () => {
    try {
        await db.authenticate();

        //stablish the relations between models
        initModels();

        await db.sync();

        //set server to listen
        const PORT = 4000;

        app.listen(PORT, () => {
            console.log('Express app running :)');
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
