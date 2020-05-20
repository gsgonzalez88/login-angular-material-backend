const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const logger = require('./module/logger')
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const auth = require('./routes/auth');
const users = require('./model/user');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

//Help secure your apps by setting various HTTP headers.
app.use(helmet());

//Configuration

console.log(`Applicaction Name: ${config.get('name')}
Mail server: ${config.get('mail.host')}`);

//for logging the req
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startUpDebugger('morgan enabled');
}
//Db work
dbDebugger('Connected to the database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//using a created middleware
app.use(logger);



console.log('server runing on port 3000')
app.use('/api/auth', auth);
app.use('/api/users', users);

app.listen(3000);