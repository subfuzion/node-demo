var app = require('../app'),
    assert = require('assert'),
    request = require('supertest');

describe('basic tests', function() {
  var lastUser;

  it('should get a collection of users', function (done) {

    request(app)
        .get('/users')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, true);

          done();
        });
  });

  it('should add a user', function (done) {

    request(app)
        .post('/users')
        .send( { name: 'nodester' } )
        .expect(200)
        .end(function(err, res) {

          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, true);

          assert.equal(result.user.name, 'nodester');

          assert(result.user.id > 0);

          lastUser = result.user;

          done();
        });

  });

  it('should get a user', function (done) {
    var id = lastUser.id;

    request(app)
        .get('/users/' + id)
        .expect(200)
        .end(function(err, res) {

          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, true);

          assert.equal(result.user.name, lastUser.name);

          assert.equal(result.user.id, lastUser.id);

          done();
        });
  });

});

