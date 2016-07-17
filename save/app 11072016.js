'use strict';

angular.module('newFinCopenApp', ['newFinCopenApp.auth', 'newFinCopenApp.admin',
    'newFinCopenApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match'
  ])
.config(function($stateProvider,$urlRouterProvider, $locationProvider) {
  	// route for the home page
     $stateProvider
            .state('main', {
                url:'/',
                views: {
                   'content': {//new home page = start page
                        templateUrl : 'app/main/main.html',
                        controller  : 'MainComponent'
                    }
                }

            })
            // route for the about you page
            .state('main.about', {
                url:'aboutyou',
                views: {
                    'content@': {
                        templateUrl : 'app/about/about.html',
                        controller  : 'AboutComponent'                  
                    }
                }
            })
            // route for the user finance profile
            .state('main.yourfinance', {
                url: 'yourfinance',
                views: {
                    'content@': {
                        templateUrl : 'app/yourfinance/yourfinance.html',
                        controller  : 'FinanceController'
                   }
                }
            })
            // route for comparing user spending with peers
            .state('main.compare', {
                url: 'compare',
                views: {
                    'content@': {
                        templateUrl : 'app/compare/compare.html',
                        controller  : 'CompareController'
                   }
                }
            })
             // route for graphical respresentation of the financial comparison
            .state('main.summary', {
                url: 'summary',
                params: {
                    country: '',
                    agegroup: '',
                    status:'',
                    incomegroup:'',
                    housetype:'',
                    cartype:''
                },
                views: {
                    'content@': {
                        templateUrl : 'app/summary/summary.html',
                        resolve:{
                            //profileFactory: 'profileFactory',
                            peerSpending: function($http,$stateParams){

                                console.log("passa country : %0",$stateParams);
                                var qcountry = $stateParams.country;
                                var qagegroup = $stateParams.agegroup;
                                var qstatus=$stateParams.status;
                                var qincomegroup=$stateParams.incomegroup;
                                var qhousetype=$stateParams.housetype;
                                var qcartype=$stateParams.cartype;

                                var dataConfig = {
                                    country:qcountry,
                                    agegroup:qagegroup,
                                    status:qstatus,
                                    incomegroup:qincomegroup,
                                    housetype:qhousetype,
                                    cartype:qcartype
                                };

                                var paramsConfig = {
                                    query:dataConfig
                                };

                                $http.get('/api/spendingrefs',paramsConfig).success(function(response) {
                                        console.log("resolve: passa get");  
                                        var peerResults = response;
                                        console.log("passa resolve : %0",peerResults[0]);
                                        if(angular.isDefined(peerResults[0]))
                                            return peerResults[0];
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
                                            return peerResults;
                                        }
                                    }
                                );    
                                //CLAUDIO STOP    
                                //return profileFactory.query({country:qcountry,agegroup:qagegroup,status:qstatus,incomegroup:qincomegroup,housetype:qhousetype,cartype:qcartype})
                                //.$promise.then(
                                //function (response) {//if I find the peer spending in the DB, then I use it
                                //        var peerResults = response;
                                //        console.log("passa resolve : %0",peerResults[0]);
                                //        if(angular.isDefined(peerResults[0]))
                                //            return peerResults[0];
                                //        else{
                                //            var peerResults = {
                                //                house:1500,
                                //                utilities:150,
                                //                insurance:300,
                                //                education:100,
                                //                transport:400,
                                //                housing:400
                                //            };        
                                //            console.log("passa empty:" + peerResults);
                                //            return peerResults;
                                //        }
                                //},
                                //function (response){
                                //        console.log("passa ERROR:" + response.status);
                                //}

                                //);
                                //CLAUDIO STOP 
                            }
                        },
                        controller  : 'SummaryController'
                   }
                }
            })


            ;

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  



  });

