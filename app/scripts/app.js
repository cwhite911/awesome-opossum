'use strict';

var app = angular.module('awesome-opossume', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: '../app/views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
