'use strict';

angular.module('newFinCopenApp')
  .controller('FinanceController', function ($scope,$filter,userProfile,profileQuery){
     

    $scope.profileQuery = profileQuery;
    $scope.aboutyou=userProfile;
//    $scope.peerSpending=peerSpending;

    var houseTypes=[{
        value: "flt",
        label: "Flat"
    }, {
        value: "row",
        label: "Row House"
    },
    {
        value: "smd",
        label: "Semi-Detached"
    },
    {
        value: "det",
        label: "Detached"
    }];

    var carTypes=[{
        value: "nee",
        label: "No"
    }, {
        value: "cmp",
        label: "Compact"
    },
    {
        value: "mid",
        label: "Mid Class"
    },
    {
        value: "big",
        label: "High Class"
    }];


    $scope.carTypes=carTypes;
    $scope.houseTypes=houseTypes;

    $scope.buildYourFinanceProfile = function () {
        
        console.log('passa3');

        //income group
        var yourIncome = parseInt($scope.aboutyou.income);
        if( yourIncome <= 30000 )
            $scope.profileQuery.incomegroup = "low";
        else if (yourIncome >30000 && yourIncome <= 70000 )
            $scope.profileQuery.incomegroup = "avg";
        else if (yourIncome >70000 )
            $scope.profileQuery.incomegroup = "high";

        //house type
        var yourHouse = $filter('filter')($scope.houseTypes,{label:$scope.aboutyou.houseType})[0];
        $scope.profileQuery.housetype = yourHouse.value;

        //car type
        var yourCar = $filter('filter')($scope.carTypes,{label:$scope.aboutyou.carType})[0];
        $scope.profileQuery.cartype = yourCar.value;  
        console.log("income "+ $scope.profileQuery.incomegroup+"\nhouse"+$scope.profileQuery.housetype+"\ncar "+$scope.profileQuery.cartype);        

    };



  });
