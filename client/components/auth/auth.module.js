'use strict';

angular.module('newFinCopenApp.auth', ['newFinCopenApp.constants', 'newFinCopenApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
