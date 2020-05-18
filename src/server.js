const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const logger = require('./module/logger')
const helmet = require('helmet');
const morgan = require('morgan');

//Help secure your apps by setting various HTTP headers.
app.use(helmet());

//for logging the req
app.use(morgan('tiny'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//using a created middleware
app.use(logger);



console.log('server runing on port 3000')
app.post('/api/authenticate', function (req, res) {
    console.log('req',req.body.email);
    console.log(req.body.password === '1234')
    if(req.body.email === 'test@domain.com' && req.body.password === '1234'){
        res.send(true)
    } else {
        return res.send(false)
    };
});

app.listen(3000);