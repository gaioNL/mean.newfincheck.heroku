'use strict';

angular.module('newFinCopenApp')
  .controller('CompareController', function ($rootScope,$scope,$filter,$state,userProfile,profileQuery,Auth,$location,$cookieStore){
     

    $scope.profileQuery = profileQuery;
    $scope.aboutyou=userProfile;
//    $scope.peerSpending=peerSpending;
    var tempInt = parseInt($scope.aboutyou.mortgage);
    $scope.aboutyou.mortgage = tempInt;
    var tempInt = parseInt($scope.aboutyou.utilities);
    $scope.aboutyou.utilities = tempInt;
    var tempInt = parseInt($scope.aboutyou.insurance);
    $scope.aboutyou.insurance = tempInt;
    var tempInt = parseInt($scope.aboutyou.education);
    $scope.aboutyou.education = tempInt;
    var tempInt = parseInt($scope.aboutyou.transport);
    $scope.aboutyou.transport = tempInt;
    var tempInt = parseInt($scope.aboutyou.housing);
    $scope.aboutyou.housing = tempInt;

    $scope.searchPeerSpending = function () {
        
          //Auth.isLoggedIn(function(loggedIn) {
          //  if (!loggedIn) {
          //      $state.go('login');
          //  }
          //  else{
          //      $state.go('main.summary');
          //  }
          //});

          $state.go('main.summary');

    };


  });
