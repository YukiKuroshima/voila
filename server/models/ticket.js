const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Set up Schema
 */

const Customer = new Schema({
  // student id
  data: {
    type: String,
  },
  // key used in URL
  key: {
    type: String,
  },
});

module.exports = mongoose.model('Ticket', new Schema({
  // ticket id
  id: {
    type: String,
    match: [
      /^\w+$/,
      'No whitespace in id',
    ],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // List of customers (students) checking in
  customers: [Customer],
}));

