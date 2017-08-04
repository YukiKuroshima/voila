/**
 * impot libraries
 */

const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

const app = express();

/**
 * Configuration
 */

const port = process.env.PORT || 8080;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


/**
 * Route
 */

// basic route (http://localhost:8080)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

// Create an instance for API rotue
const apiRoute = express.Router();


/**
 * POST /api/ticket/:id/:key
 * Post userdata and check id and key with DB
 */
apiRoute.post('/tickets/:id/:key', (req, res) => {
  // TODO Check if id and key are valid

  // // if ticket id is invalid
  // res.status(400).json({
  //   message: 'Success',
  // });

  // // if key is invalid
  // res.status(400).json({
  //   message: 'Success',
  // });

  // if everything is ok
  // TODO Save the data to DB
  res.status(201).json({
    message: 'Success',
  });
});

/**
 * GET /api/ticket/:id
 * Get unique URL
 */
apiRoute.get('/tickets/:id', (req, res) => {
  // Check if query is an empty object
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    // query is empty obj
    // Generate unique URL
    // TODO Save id and key to the DB
    // Success
    res.status(201).json({
      id: req.params.id,
      key: uniqid(),
    });
  } else {
    // Query exist
    // Find
    // Success
    res.status(200).json({
      result: 'Query result',
    });
  }
});

app.use('/api', apiRoute);

/**
 * Start server
 */

app.listen(port);
console.log(`Server running ${port}`);

// exports module only for testing
if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
