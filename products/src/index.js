const express = require('express');
const { PORT } = require('../src/configs');
const { dataConnection } = require('../src/database');
const expressApp = require('./express-app');

const StartServer = async () => {
    const app = express();

    dataConnection();

    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();