//creating a custom middleware fuction

function log(req, res, next) {
    console.log('Logging...');
    next();
};

module.exports = log;




