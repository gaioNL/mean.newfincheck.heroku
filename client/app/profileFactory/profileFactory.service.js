'use strict';

angular.module('newFinCopenApp')
//old
//.constant("baseURL", "http://localhost:5000/")
.constant("baseURL", "https://newfincheroku.herokuapp.com/")
.service('profileFactory', function ($resource, baseURL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    console.log("passa profileFactory");
    return $resource(baseURL + "api/spendingrefs/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
  });
