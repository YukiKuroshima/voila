/**
 * impot libraries
 */

const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket');

require('dotenv').config();

const app = express();

/**
 * Configuration
 */

const port = process.env.PORT || 8080;

// To avoid error of mongoose mpromise DeprecationWarning
mongoose.Promise = global.Promise;

// During testing
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.DB_URI);
} else if (process.env.NODE_ENV !== 'test') {
  // Activate morgan
  app.use(morgan('dev'));
  mongoose.connect(process.env.DB_TEST_URI);
}

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

apiRoute.get('/tickets/setup', (req, res) => {
  const newTicket = new Ticket({
    id: 'TestID',
    password: 'Test PW',
  });

  newTicket.save((err) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(201).json({
        message: 'New ticket created',
      });
    }
  });
});

/**
 * GET /api/ticket/:id
 * Get unique URL
 */
apiRoute.get('/tickets/:id', (req, res) => {
  // Check if query is an empty object
  // //////////////
  //   GENERATE  //
  // //////////////
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    // query is empty obj
    // Generate unique URL
    // TODO Save id and key to the DB
    const key = uniqid();
    Ticket.findOneAndUpdate({
      id: req.params.id,
    }, {
      $push: key,
    }, {
      new: true,
      runValidators: true,
    }, (err, updatedTicket) => {
      if (err) {
        // When an error
        res.status(400).json({
          id: req.params.id,
          err,
        });
      } else {
        // Success
        ticket.customers.push({
          key,
          test: 'Testing',
        });
          // Saving parent to save child
          ticket.save((errSave) => {
            if (errSave) {
              res.status(400).json({
                id: req.params.id,
                errSave,
              });
            } else {
              res.status(201).json({
                id: req.params.id,
                key,
              });
            }
          });
        }
      });
  // ///////////////
  //     QUERY    //
  // ///////////////
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
