const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Set up Schema
 */

const Customer = new Schema({
  // student id
  id: {
    type: String,
  },
  // key used in URL
  key: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Ticket', new Schema({
  // ticket id
  id: {
    type: String,
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

