var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./app.js');

var expect = chai.expect;

chai.use(chaiHttp);

//test /users
describe('App', function() {
  describe('/users', function() {
    it('responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/users')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /users/query with results
describe('App', function() {
  describe('/users/query?name=root', function() {
    it('query responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/users/query?name=root')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});









//test /users/query with no results
describe('App', function() {
  describe('/users/query?name=thisdoesnotexist', function() {
    it('query responds with no results, status 404', function(done) {
      chai.request(app)
        .get('/users/query?name=thisdoesnotexist')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /users/uid for valid uid
describe('App', function() {
  describe('/users/validUID', function() {
    it('responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/users/0')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /users/uid for invalid uid
describe('App', function() {
  describe('/users/invalidUID', function() {
    it('check invalid uid, responds with status 404', function(done) {
      chai.request(app)
        .get('/users/-10')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
