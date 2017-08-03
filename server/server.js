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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// basic route (http://localhost:8080)
app.get('/', (req, res) => {
  res.send('Hello!');
});

/**
 * Start server
 */

app.listen(port);
console.log(`Server running ${port}`);
