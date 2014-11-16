'use strict';

var angular = require('angular');
var app = angular.module('awesome-opossume', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

