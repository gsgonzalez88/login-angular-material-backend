const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

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