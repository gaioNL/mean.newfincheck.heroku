'use strict';

describe('Service: peerSpending', function () {

  // load the service's module
  beforeEach(module('newFinCopenApp'));

  // instantiate service
  var peerSpending;
  beforeEach(inject(function (_peerSpending_) {
    peerSpending = _peerSpending_;
  }));

  it('should do something', function () {
    expect(!!peerSpending).to.be.true;
  });

});
