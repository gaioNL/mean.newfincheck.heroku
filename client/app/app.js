'use strict';

angular.module('newFinCopenApp', ['newFinCopenApp.auth', 'newFinCopenApp.admin',
    'newFinCopenApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match','chart.js'
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
                //authenticate:true,
                views: {
                    'content@': {
                        templateUrl : 'app/summary/summary.html',
                        controller  : 'SummaryController'

                   }
                }
            })

            ;

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  



});


