'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var spendingrefCtrlStub = {
  index: 'spendingrefCtrl.index',
  show: 'spendingrefCtrl.show',
  create: 'spendingrefCtrl.create',
  update: 'spendingrefCtrl.update',
  destroy: 'spendingrefCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var spendingrefIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './spendingref.controller': spendingrefCtrlStub
});

describe('Spendingref API Router:', function() {

  it('should return an express router instance', function() {
    expect(spendingrefIndex).to.equal(routerStub);
  });

  describe('GET /api/spendingrefs', function() {

    it('should route to spendingref.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'spendingrefCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/spendingrefs/:id', function() {

    it('should route to spendingref.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'spendingrefCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/spendingrefs', function() {

    it('should route to spendingref.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'spendingrefCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/spendingrefs/:id', function() {

    it('should route to spendingref.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'spendingrefCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/spendingrefs/:id', function() {

    it('should route to spendingref.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'spendingrefCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/spendingrefs/:id', function() {

    it('should route to spendingref.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'spendingrefCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
