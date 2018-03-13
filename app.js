if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log('\nUsing local variables.env configuration.');
}

const express = require('express');
const session = require('express-session');
const postgres = require('pg');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const environmentVariables = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    database: process.env.DATABASE || 'idle_styles',
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    idleTimeoutMillis: process.env.CONNECT_TIMEOUT || 30000
};


// *********************************************************************************
// Parser
// *********************************************************************************
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// *********************************************************************************
// Postgres
// *********************************************************************************
const pool = new postgres.Pool(process.env);

pool.query('SELECT NOW()', async (err, res) => {
    await console.log('\nLOG: \n', err, res, '\n');
    pool.end();
});
    

// *********************************************************************************
// Index
// *********************************************************************************
app.use(express.static('public'));


// *********************************************************************************
// Routes
// *********************************************************************************
require('./routes/Routes.js')(app);


// *********************************************************************************
// Modules
// *********************************************************************************
require('./modules/Modules.js')(app);


// *********************************************************************************
// Listen
// *********************************************************************************
app.listen(environmentVariables.port, () => { console.log(`IdleStyles running at ${environmentVariables.host+':'+environmentVariables.port}!`); });
