const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const logger = require('./module/logger')
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startUpDebugger = require('debug')('app:startup');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const dbDebugger = require('debug')('app:db');
const auth = require('./routes/auth');
const users = require('./routes/users.route');

//Db work
dbDebugger('Connected to the database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//using a created middleware
app.use(logger);

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-gsgonzalez88.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://localhost:3000',
    issuer: `https://dev-gsgonzalez88.auth0.com/`,
    algorithms: ['RS256']
  });


// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

console.log('server runing on port 3000')
app.use('/api/auth', auth);
app.use('/api/user', users);

app.listen(3000);