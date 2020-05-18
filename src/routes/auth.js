const express = require('express');
const router = express.Router();

router.post('/auth', function (req, res) {
    console.log('asdfasñldkfj')
    console.log('req',req.body.email);
    console.log(req.body.password === '1234')
    if(req.body.email === 'test@domain.com' && req.body.password === '1234'){
        res.send(true)
    } else {
        return res.send(false)
    };
});


module.exports = router;