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
    })
    //usa la camel case name es a dir:  w3TestDirective  es invocada separant perl tag  <w3-test-directive>
    .directive('w3TestDirective',function(){
        return {
            template: "<p>Això és el resultat retornat  per una directiva</p>"
        };
    })

;
