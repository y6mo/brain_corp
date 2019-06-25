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

//test /users/query with one parameter
describe('App', function() {
  describe('/users/query?name=root', function() {
    it('query with one paramater responds with status 200 and an object', function(done) {
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

//test /users/query with multiple params
describe('App', function() {
  describe('/users/query?name=root&gid=0', function() {
    it('query with multiple parameters responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/users/query?name=root&gid=0')
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
    it('query responds with status 200 and empty obj', function(done) {
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

//test /users/uid/groups for valid uid
describe('App', function() {
  describe('/users/validUID/groups', function() {
    it('check valid uid groups, responds with status 200', function(done) {
      chai.request(app)
        .get('/users/0/groups')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /users/uid/groups for invalid uid
describe('App', function() {
  describe('/users/invalidUID/groups', function() {
    it('check invalid uid groups, responds with status 200, 0 results', function(done) {
      chai.request(app)
        .get('/users/-10/groups')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /groups
describe('App', function() {
  describe('/groups', function() {
    it('responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/groups')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /groups/query single parameter
describe('App', function() {
  describe('/groups/query/singleparam', function() {
    it('/groups/query single parameter responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/groups/query?name=daemon')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /groups/query multiple parameters
describe('App', function() {
  describe('/groups/query/multipleparams', function() {
    it('/groups/query multiple parameters responds with status 200 and an object', function(done) {
      chai.request(app)
        .get('/groups/query?name=daemon&gid=1')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /groups/query no results
describe('App', function() {
  describe('/groups/query/noresults', function() {
    it('/groups/query no results responds with status 200 and an empty object', function(done) {
      chai.request(app)
        .get('/groups/query?name=daemon&gid=1&name=555')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /groups/gid with result
describe('App', function() {
  describe('/groups/validGID', function() {
    it('/groups/validGID responds with status 200 and an empty object', function(done) {
      chai.request(app)
        .get('/groups/0')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//test /groups/gid with no result
describe('App', function() {
  describe('/groups/invalidGID', function() {
    it('/groups/invalidGID responds with status 404', function(done) {
      chai.request(app)
        .get('/groups/-100')
        .end(function(err, res) {
          expect(res).to.be.an('object');
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
