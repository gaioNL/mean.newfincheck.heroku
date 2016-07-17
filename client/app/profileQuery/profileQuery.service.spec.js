'use strict';

describe('Service: profileQuery', function () {

  // load the service's module
  beforeEach(module('newFinCopenApp'));

  // instantiate service
  var profileQuery;
  beforeEach(inject(function (_profileQuery_) {
    profileQuery = _profileQuery_;
  }));

  it('should do something', function () {
    expect(!!profileQuery).to.be.true;
  });

});
