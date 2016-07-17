'use strict';

angular.module('newFinCopenApp')
.controller('SummaryController', function ($scope,$filter,$http,$stateParams,userProfile,peerSpending){
     
$scope.aboutyou=userProfile;
$scope.peerSpending=peerSpending;
console.log("passa CompareController %0",peerSpending);

///////////////

$scope.labels = [' '];
$scope.series = ['You', 'Your Peers'];

    $scope.colors= [{
          fillColor: "#ff9933",
          strokeColor: "#fff",
          pointColor: "#ff9933",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff9933"
    }];

    //prepare data
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

    //data for doughnut chart
    
    $scope.doughnutLabels = ["Mortgage","Utilities","Insurance","Education","Transport","Housing"];
    $scope.doughnutData = [$scope.aboutyou.mortgage,$scope.aboutyou.utilities,$scope.aboutyou.insurance,$scope.aboutyou.education,$scope.aboutyou.transport,$scope.aboutyou.housing];

    //data for comparison
    $scope.mortgagedata = [
        [$scope.aboutyou.mortgage],
        [$scope.peerSpending.house]
    ];
    $scope.utilitiesdata = [
        [$scope.aboutyou.utilities],
        [$scope.peerSpending.utilities]
    ];
    $scope.insurancedata = [
        [$scope.aboutyou.insurance],
        [$scope.peerSpending.insurance]
    ];
    $scope.educationdata = [
        [$scope.aboutyou.education],
        [$scope.peerSpending.education]
    ];
    $scope.transportdata = [
        [$scope.aboutyou.transport],
        [$scope.peerSpending.transport]
    ];
    $scope.housingdata = [
        [$scope.aboutyou.housing],
        [$scope.peerSpending.housing]
    ];



  });
