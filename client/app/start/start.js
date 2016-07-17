'use strict';

angular.module('newFinCopenApp')
.config(function($stateProvider) {
    $stateProvider.state('app', {
      url: '/',
      template: '<app></app>'
    });
  })
;
