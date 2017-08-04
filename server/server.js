/**
 * impot libraries
 */

const express = require('express');
const bodyParser = require('body-parser');

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

// basic route (http://localhost:8080)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

/**
 * Start server
 */

app.listen(port);
console.log(`Server running ${port}`);

// exports module only for testing
if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
