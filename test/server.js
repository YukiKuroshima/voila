/**
 * Set up for testing
 */

process.env.NODE_ENV = 'test';

const server = require('../server/server.js');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();


chai.use(chaiHttp);

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
});

describe('GET /api/tickets/:id', () => {
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
  it('should return correct ID', (done) => {
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
