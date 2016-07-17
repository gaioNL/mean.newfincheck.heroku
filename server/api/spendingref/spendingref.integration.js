'use strict';

var app = require('../..');
import request from 'supertest';

var newSpendingref;

describe('Spendingref API:', function() {

  describe('GET /api/spendingrefs', function() {
    var spendingrefs;

    beforeEach(function(done) {
      request(app)
        .get('/api/spendingrefs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          spendingrefs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(spendingrefs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/spendingrefs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/spendingrefs')
        .send({
          name: 'New Spendingref',
          info: 'This is the brand new spendingref!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSpendingref = res.body;
          done();
        });
    });

    it('should respond with the newly created spendingref', function() {
      expect(newSpendingref.name).to.equal('New Spendingref');
      expect(newSpendingref.info).to.equal('This is the brand new spendingref!!!');
    });

  });

  describe('GET /api/spendingrefs/:id', function() {
    var spendingref;

    beforeEach(function(done) {
      request(app)
        .get('/api/spendingrefs/' + newSpendingref._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          spendingref = res.body;
          done();
        });
    });

    afterEach(function() {
      spendingref = {};
    });

    it('should respond with the requested spendingref', function() {
      expect(spendingref.name).to.equal('New Spendingref');
      expect(spendingref.info).to.equal('This is the brand new spendingref!!!');
    });

  });

  describe('PUT /api/spendingrefs/:id', function() {
    var updatedSpendingref;

    beforeEach(function(done) {
      request(app)
        .put('/api/spendingrefs/' + newSpendingref._id)
        .send({
          name: 'Updated Spendingref',
          info: 'This is the updated spendingref!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSpendingref = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSpendingref = {};
    });

    it('should respond with the updated spendingref', function() {
      expect(updatedSpendingref.name).to.equal('Updated Spendingref');
      expect(updatedSpendingref.info).to.equal('This is the updated spendingref!!!');
    });

  });

  describe('DELETE /api/spendingrefs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/spendingrefs/' + newSpendingref._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when spendingref does not exist', function(done) {
      request(app)
        .delete('/api/spendingrefs/' + newSpendingref._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
