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
