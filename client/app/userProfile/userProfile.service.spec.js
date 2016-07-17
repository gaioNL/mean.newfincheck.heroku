'use strict';

describe('Service: userProfile', function () {

  // load the service's module
  beforeEach(module('newFinCopenApp'));

  // instantiate service
  var userProfile;
  beforeEach(inject(function (_userProfile_) {
    userProfile = _userProfile_;
  }));

  it('should do something', function () {
    expect(!!userProfile).to.be.true;
  });

});
