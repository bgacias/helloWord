'use strict';
//   http://raibledesigns.com/rd/entry/getting_started_with_angularjs

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'SearchCtrl'
        });
    }])



    .factory('SearchService', function ($http) {
        var service = {
            query: function (term) {
                return $http.get('/localitza/' + term);
            }
        };
        return service;
    })

    .controller('SearchCtrl', function($scope,SearchService) {
        console.log("iniciant SearchCtrl...");
        $scope.search = function () {
            console.log("Search term is: " + $scope.term);
            SearchService.query($scope.term).then(function (response) {
                $scope.searchResults = response.data;
                $scope.statuscode = response.status;
                $scope.statustext = response.statustext;
                console.log("num resultats="+response.data.length+" response.status is: " + response.status+ "  response.statustext="+response.statustext);
            }, function(response){
                console.log("response.status is: " + response.status+ "  response.statustext="+response.statustext);
            });

        };

    })


;

