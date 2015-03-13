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

  // test expected errors
    it('missing name in object: should return error (400)', function (done) {

        request(app)
            .post('/users')
            .send( { } )
            .expect(400)
            .end(function(err, res) {

                if (err) return done(err);

                var result = res.body;

                assert.equal(result.success, false);

                assert.equal(result.reason, 'missing user name');

                done();
            });

    });

    it('user not found: should return error (404)', function (done) {

        var id = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 8; i++)
            id += possible.charAt(Math.floor(Math.random() * possible.length));

        request(app)
            .get('/users/' + id)
            .expect(404)
            .end(function(err, res) {

                if (err) return done(err);

                var result = res.body;

                assert.equal(result.success, false);

                assert.equal(result.reason, 'user id not found');

                done();
            });
    });


});

