/**
 * Set up for testing
 */

process.env.NODE_ENV = 'test';

require('dotenv').config();

const server = require('../server/server');
const Ticket = require('../server/models/ticket');
const uniqid = require('uniqid');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Testing
 */

describe('GET /api/tickets/:id', () => {
  // Remove all tickets before and after test
  const ticketID = 'TestID';
  const tickePW = 'Test PW';
  let JWT;
  before((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      const newTicket = new Ticket({
        id: ticketID,
        password: tickePW,
      });

      // Create one ticket
      newTicket.save((errSave) => {
        if (err) {
          console.log(errSave);
        } else {
          // Assign JWT
          JWT = jwt.sign({ id: ticketID }, process.env.secret, {
            expiresIn: 86400,
          });
          done();
        }
      });
    });
  });
  after((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
  const URI = '/api/tickets/';
  const Keys = [];

  describe('Generate URL', () => {
    it('should return 401 without token', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').that.contain('No token');
          done();
        });
    });
    it('should return 401 with a wrong token', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', 'Invalid token')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').that.contain('Invalid token');
          done();
        });
    });
    it('should return 201', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', JWT)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ticketID);
          res.body.should.have.property('key');
          Keys.push(res.body.key);
          done();
        });
    });
    it('should return 400 with wrong id', (done) => {
      const wrongID = 'AAA';
      chai.request(server)
        .get(URI + wrongID)
        .set('x-access-token', JWT)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').that.contain('No ticket found');
          res.body.should.have.property('id').that.contain(wrongID);
          done();
        });
    });
    it('should return correct ID', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', JWT)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ticketID);
          res.body.should.have.property('key');
          Keys.push(res.body.key);
          done();
        });
    });
    it('should be size === 1', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', JWT)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ticketID);
          res.body.should.have.property('key');
          Keys.push(res.body.key);
          Ticket.count({}, (errDB, c) => {
            if (errDB) {
              console.log(errDB);
            } else {
              c.should.be.eql(1);
            }
            done();
          });
        });
    });
    it('Customer should be size > 0', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', JWT)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ticketID);
          res.body.should.have.property('key');
          Keys.push(res.body.key);
          Ticket.find({}, (errDB, ticket) => {
            if (errDB) {
            } else if (!ticket) {
            } else {
            }
            done();
          });
        });
    });
  });
  describe('Query', () => {
    it('should return 400 with wrong id', (done) => {
      const ID = 'AAA';
      chai.request(server)
        .get(URI + ID)
        .set('x-access-token', JWT)
        .query({ test: 'test' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('id').that.contain(ID);
          res.body.should.have.property('error').that.contain('No ticket found by the id');
          done();
        });
    });
    it('should return ticket', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', JWT)
        .query({ test: 'test' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id').that.contain(ticketID);
          res.body.result.should.have.property('password').that.contain(tickePW);
          res.body.result.should.have.property('customers').that.to.be.an('array');
          res.body.result.customers.should.have.lengthOf.above(1);
          res.body.result.customers[0].should.have.property('key').that.to.be.an('String');
          // res.body.should.have.property('ticket').that.contain(ID);
          done();
        });
    });
    it('should match all keys', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .set('x-access-token', JWT)
        .query({ test: 'test' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id').that.contain(ticketID);
          res.body.result.should.have.property('password').that.contain(tickePW);
          res.body.result.should.have.property('customers').that.to.be.an('array');
          res.body.result.customers.should.have.lengthOf.above(1);
          res.body.result.customers[0].should.have.property('key').that.to.be.an('String');
          res.body.result.customers.forEach((customer) => {
            // check a key from a cutomer is in Keys
            Keys.should.include(customer.key);
          });
          done();
        });
    });
  });
});


describe('POST /api/tickets/:id/:key"', () => {
  const Keys = [];
  const ticketID = 'TestID';
  const tickePW = 'Test PW';
  before((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      const newTicket = new Ticket({
        id: ticketID,
        password: tickePW,
      });
      for (let i = 0; i < 10; i += 1) {
        const key = uniqid();
        newTicket.customers.push({ key });
        Keys.push(key);
      }
      // Save one ticket with 10 customers
      newTicket.save((errSave) => {
        if (err) {
          console.log(errSave);
        } else {
          done();
        }
      });
    });
  });
  after((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
  const URI = '/api/tickets/';
  it('should return 400 with an invalid ticket id', (done) => {
    const ID = 'WrongID';
    const KEY = 1;
    chai.request(server)
      .post(`${URI}${ID}/${KEY}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('id').that.contain(ID);
        res.body.should.have.property('error').that.contain('No ticket');
        done();
      });
  });
  it('should return 400 with an invalid URL', (done) => {
    const KEY = 1;
    chai.request(server)
      .post(`${URI}${ticketID}/${KEY}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('id').that.contain(ticketID);
        res.body.should.have.property('key').that.contain(KEY);
        res.body.should.have.property('error').that.contain('No customer');
        done();
      });
  });
  it('should return 400 without data', (done) => {
    chai.request(server)
      .post(`${URI}${ticketID}/${Keys[0]}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('id').that.contain(ticketID);
        res.body.should.have.property('key').that.contain(Keys[0]);
        res.body.should.have.property('error').that.contain('no data to post');
        done();
      });
  });
  it('should return 200 with data', (done) => {
    const index = 0;
    const data = {
      data: 'Test Data',
    };
    chai.request(server)
      .post(`${URI}${ticketID}/${Keys[index]}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('id').that.contain(ticketID);
        res.body.should.have.property('key').that.contain(Keys[index]);
        res.body.should.have.property('message').that.contain('Success');
        done();
      });
  });
  it('should return 200 and data saved', (done) => {
    const index = 1;
    const data = {
      data: 'Test Data',
    };
    chai.request(server)
      .post(`${URI}${ticketID}/${Keys[index]}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('id').that.contain(ticketID);
        res.body.should.have.property('key').that.contain(Keys[index]);
        res.body.should.have.property('message').that.contain('Success');
        Ticket.findOne({ id: ticketID }, (err, ticket) => {
          ticket.customers[index].key.should.to.eql(Keys[index]);
          ticket.customers[index].data.should.to.eql(data.data);
          done();
        });
      });
  });
});
describe('POST /api/tickets/"', () => {
  before((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
  after((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
  const URI = '/api/tickets/';
  it('should return 400 without id', (done) => {
    const ticket = {
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide an id');
        done();
      });
  });
  it('should return 400 with empty id', (done) => {
    const ticket = {
      id: '',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide an id');
        done();
      });
  });
  it('should return 400 without password', (done) => {
    const ticket = {
      id: 'myID',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide a password');
        done();
      });
  });
  it('should return 400 with empty password', (done) => {
    const ticket = {
      id: 'myID',
      password: '',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide a password');
        done();
      });
  });
  it('should return 400 if ID includes a white space ', (done) => {
    const ticket = {
      id: 'my ID',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('No whitespace in id');
        done();
      });
  });
  it('should return 201', (done) => {
    const ticket = {
      id: 'myid',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').that.contain('Success');
        done();
      });
  });
  it('should return 400 with duplicate id', (done) => {
    const ticket = {
      id: 'myid',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('duplicate');
        done();
      });
  });
  it('should return 400 with duplicate id', (done) => {
    const ticket = {
      id: 'myid',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('duplicate');
        done();
      });
  });
  it('should return 201 with a different id', (done) => {
    const ticket = {
      id: 'myid2',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').that.contain('Success');
        done();
      });
  });
});
describe('POST /api/tickets/auth', () => {
  const id = 'TestID';
  const password = 'TestPW';
  before((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newTicket = new Ticket({
          id,
          password,
        });
        newTicket.save((err) => {
          if (err) {
            console.log(err.message);
          }
        });
      }
      done();
    });
  });
  after((done) => {
    Ticket.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
  const URI = '/api/tickets/auth';
  it('should return 400 without id', (done) => {
    const ticket = {
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide an id');
        done();
      });
  });
  it('should return 400 with empty id', (done) => {
    const ticket = {
      id: '',
      password: 'password',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide an id');
        done();
      });
  });
  it('should return 400 without password', (done) => {
    const ticket = {
      id: 'myid',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide a password');
        done();
      });
  });
  it('should return 400 with empty password', (done) => {
    const ticket = {
      id: 'myid',
      password: '',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Please provide a password');
        done();
      });
  });
  it('should return 400 with a wrong id', (done) => {
    const ticket = {
      id: 'myid',
      password: 'a',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('No ticket found by the id');
        res.body.should.have.property('id').that.contain('myid');
        done();
      });
  });
  it('should return 400 with a wrong password', (done) => {
    const ticket = {
      id,
      password: 'wrongPW',
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').that.contain('Wrong password');
        res.body.should.have.property('id').that.contain(id);
        res.body.should.have.property('password').that.contain('wrongPW');
        done();
      });
  });
  it('should return 200', (done) => {
    const ticket = {
      id,
      password,
    };
    chai.request(server)
      .post(URI)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').that.contain('Enjoy your token');
        res.body.should.have.property('token');
        done();
      });
  });
});
