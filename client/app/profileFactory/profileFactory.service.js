'use strict';



angular.module('newFinCopenApp')
.constant("baseURL", "http://localhost:9000/")
.service('profileFactory', function ($resource, baseURL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    console.log("passa profileFactory");
    return $resource(baseURL + "api/spendingrefs/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
  });
