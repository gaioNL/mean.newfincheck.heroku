'use strict';

describe('Service: profileFactory', function () {

  // load the service's module
  beforeEach(module('newFinCopenApp'));

  // instantiate service
  var profileFactory;
  beforeEach(inject(function (_profileFactory_) {
    profileFactory = _profileFactory_;
  }));

  it('should do something', function () {
    expect(!!profileFactory).to.be.true;
  });

});
