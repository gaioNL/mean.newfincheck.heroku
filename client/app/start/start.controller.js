'use strict';

(function() {

  class StartController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];


    }

    
  }

  angular.module('newFinCopenApp')
    .component('app', {
      templateUrl: 'app/start/start.html',
      controller: StartController
    });
})();
