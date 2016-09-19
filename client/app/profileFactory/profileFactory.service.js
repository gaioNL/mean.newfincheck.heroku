'use strict';

var config = require('./config/environment');

var uristring = config.mongo.uri + ":" + config.port + "/" ;

console.log("passa profileFactory " + uristring); 

angular.module('newFinCopenApp')
//old
//.constant("baseURL", "http://localhost:5000/")
.constant("baseURL", uristring)
.service('profileFactory', function ($resource, baseURL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    console.log("passa profileFactory");
    return $resource(baseURL + "api/spendingrefs/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
  });
