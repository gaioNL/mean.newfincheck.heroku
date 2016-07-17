'use strict';

angular.module('newFinCopenApp')
.controller('SummaryController', function ($scope,$filter,$http,$stateParams,userProfile,peerSpending,profileQuery,profileFactory){
     
$scope.aboutyou=userProfile;
$scope.profileQuery = profileQuery;

var qcountry = $scope.profileQuery.country;
var qagegroup = $scope.profileQuery.agegroup;
var qstatus=$scope.profileQuery.status;
var qincomegroup=$scope.profileQuery.incomegroup;
var qhousetype=$scope.profileQuery.housetype;
var qcartype=$scope.profileQuery.cartype;

var dataConfig = {
    country:qcountry,
    agegroup:qagegroup,
    status:qstatus,
    incomegroup:qincomegroup,
    housetype:qhousetype,
    cartype:qcartype
};

var paramsConfig = {
    params:dataConfig
};

console.log("SummaryController : %0",paramsConfig.params);

//$http.get('/api/spendingrefs',paramsConfig).success(function(response) 
profileFactory.query(dataConfig).$promise.then(function (response)
{
    var peerResults = response;
    console.log("SummaryController passa get : %0",peerResults[0]);
    if(angular.isDefined(peerResults[0]))
            $scope.peerSpending = peerResults[0];
    else{
        var peerResults = {
            house:1500,
            utilities:150,
            insurance:300,
            education:100,
            transport:400,
            housing:400
        };        
        console.log("passa empty:" + peerResults);
        $scope.peerSpending =  peerResults;
    }

    console.log("passa SummaryController %0",$scope.peerSpending);

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

    console.log("Prep Data About you Mortgage "+$scope.aboutyou.mortgage+ " peerSpending Mortgage "+$scope.peerSpending.house);

}

);

});
