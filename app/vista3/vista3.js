'use strict';

angular.module('myApp.vista3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/vista3', {
            templateUrl: 'vista3/vista3.html',
            controller: 'Vista3Ctrl'
        });
    }])

    .controller('Vista3Ctrl', function($scope) {
        $scope.name3="Hello word";
    });
