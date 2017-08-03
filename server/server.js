/**
 * impot libraries
 */

import express from 'express';

const app = express();

/**
 * Configuration
 */

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`Server running ${port}`);
