const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

console.log('server runing on port 3000')
app.post('/api/authenticate', function (req, res) {
    console.log('req',req.body);
    return res.send('Hello world');
});

app.listen(3000);