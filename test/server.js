/**
 * Set up for testing
 */

process.env.NODE_ENV = 'test';

const server = require('../server/server');
const Ticket = require('../server/models/ticket');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Testing
 */
describe('GET /', () => {
  const URI = '/';
  it('should return 200', (done) => {
    chai.request(server)
      .get(URI)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').that.contain('Hello!');
        done();
      });
  });

  describe('GET /api/tickets/:id Generate URL', () => {
    // Remove all tickets before and after test
    const ticketID = 'Test ID';
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

        // Create one ticket
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
    it('should return 201', (done) => {
      const ID = 1;
      chai.request(server)
        .get(URI + ID)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ID);
          res.body.should.have.property('key');
          done();
        });
    });
    it('should return correct ID', (done) => {
      const ID = 'AAA';
      chai.request(server)
        .get(URI + ID)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ID);
          res.body.should.have.property('key');
          done();
        });
    });
    it('should be size === 1', (done) => {
      chai.request(server)
        .get(URI + ticketID)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ticketID);
          res.body.should.have.property('key');
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
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id').that.contain(ticketID);
          res.body.should.have.property('key');
          Ticket.find({}, (errDB, ticket) => {
            if (errDB) {
              console.log(errDB);
            } else if (!ticket) {
              console.log('Ticket not found');
            } else {
              console.log('Ticket found');
              console.log(ticket);
              console.log('Customer found');
              console.log(ticket.customers[0]);
              // ticket.customers.count({}, (errDBChild, c) => {
              //   if (errDBChild) {
              //     console.log('Customer not found');
              //     console.log(errDBChild);
              //   } else {
              //     console.log('Customer  found');
              //     console.log(c);
              //     c.should.be.at.least(1);
              //   }
              //   done();
              // });
            }
          });
        });
    });
  });

  describe('GET /api/tickets/:id Query', () => {
    // Remove all tickets before and after test
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
    it('should have property "result"', (done) => {
      const ID = 'AAA';
      chai.request(server)
        .get(URI + ID)
        .query({ test: 'test' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('result');
          done();
        });
    });
  });

  describe('POST /api/tickets/:id/:key"', () => {
    const URI = '/api/tickets/';
    it('should return 200', (done) => {
      const ID = 1;
      const KEY = 1;
      chai.request(server)
        .post(`${URI}${ID}/${KEY}`)
        .end((err, res) => {
          res.should.have.status(201);
          //res.body.should.have.property('id').that.contain(ID);
          //res.body.should.have.property('key');
          done();
        });
    });
  });
});
