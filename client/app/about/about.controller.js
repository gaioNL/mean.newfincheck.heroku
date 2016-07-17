'use strict';

angular.module('newFinCopenApp')
  .controller('AboutComponent', function ($scope,$filter,userProfile,profileQuery){
     

    $scope.profileQuery = profileQuery;
    $scope.aboutyou=userProfile;
//    $scope.peerSpending=peerSpending;
    
    var countries = [{
        value: "fra",
        label: "France"
    }, {
        value: "ita",
        label: "Italy"
    },
    {
        value: "nld",
        label: "Netherlands"
    }];

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


    $scope.agespan = 99;
    $scope.maxKids = 8;

    $scope.agerange= [];
    for(var i = 17; i < $scope.agespan; i += 1) {
        $scope.agerange.push(i + 1);
    }
    $scope.kidsNo = [];
    for(var i = -1; i < $scope.maxKids; i += 1) {
        $scope.kidsNo.push(i + 1);
    }
   
    $scope.carTypes=carTypes;
    $scope.houseTypes=houseTypes;
    $scope.countries = countries;
    $scope.invalidCountrySelection = false;

    $scope.buildAboutYouProfile = function () {
        
        console.log('passa2');

        //map country label back to value

        var yoturcountry = $filter('filter')($scope.countries,{label:$scope.aboutyou.country})[0];
        
        $scope.profileQuery.country = yoturcountry.value;

        //age group
        var yourage = parseInt($scope.aboutyou.age);

        console.log("Age " +$scope.aboutyou.age);

        if( yourage >= 18 && yourage <= 35 )
            $scope.profileQuery.agegroup = "geny";
        else if (yourage >= 36 && yourage <= 51 )
            $scope.profileQuery.agegroup = "genx";
        else if (yourage >= 52 )
            $scope.profileQuery.agegroup = "boomer";

        //status
        var kids = parseInt($scope.aboutyou.kids);
        if ($scope.aboutyou.partner == "no" && kids==0)
            $scope.profileQuery.status="single";
        else if ($scope.aboutyou.partner == "yes" && kids==0)
            $scope.profileQuery.status="couple";
        else if (kids==1)
            $scope.profileQuery.status="smallfamily";
        else if (kids>=2 && kids<=3)
            $scope.profileQuery.status="midfamily";
        else if (kids>3 )
            $scope.profileQuery.status="largefamily";   
        
        console.log("kids-"+kids+ "\ncountry" + $scope.profileQuery.country+"\nageGroup "+$scope.profileQuery.agegroup+"\nstatus "+$scope.profileQuery.status);

 
    };




  });
