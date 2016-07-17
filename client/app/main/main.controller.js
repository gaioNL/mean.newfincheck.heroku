'use strict';

angular.module('newFinCopenApp')
  .controller('MainComponent', function ($http, $scope, socket){
  		this.$http = $http;
        this.socket = socket;

});