'use strict';
//   http://raibledesigns.com/rd/entry/getting_started_with_angularjs

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
                templateUrl: 'search/search.html',
                controller: 'SearchController'
            })
            .when('/search/:term', {
                templateUrl: 'search/search.html',
                controller: 'SearchController'
            })
            .when('/edit/:id', {
                templateUrl: 'search/edit.html',
                controller: 'EditController'
            })
        ;
    }])

    .factory('SearchService', function ($http) {
        var service = {
            query: function (term) {
                if (angular.isUndefined(term)){
                    console.log("url invocada per la cerca:"+'/localitza/');
                    return $http.get('/localitza/');
                } else{
                    console.log("url invocada per la cerca:"+'/localitza/' + term);
                    return $http.get('/localitza/' + term);
                }


            },
            fetch: function (id) {
                return $http.get('/edit/' + id);
            },
            save: function(data) {
                return $http.post('/edit/' + data.id, data);
            }
        };
        return service;
    })

    .controller('SearchController', function($scope,$location, $routeParams,SearchService) {
        console.log("iniciant SearchController...");


        if ($routeParams.term) {
            console.log("parametres de cerca: " + $routeParams.term);
            SearchService.query($routeParams.term).then(function (response) {
                $scope.term = $routeParams.term;
                $scope.searchResults = response.data;
            });
        }

        $scope.search = function () {
                console.log("$scope.term cercat : " + $scope.term);
                SearchService.query($scope.term).then(function (response) {
                    $scope.searchResults = response.data;
                    $scope.statuscode = response.status;
                    $scope.statustext = response.statustext;
                    console.log("num resultats="+response.data.length+" response.status is: " + response.status+ "  response.statustext="+response.statustext);
                }, function(response){
                    console.log("response.status is: " + response.status+ "  response.statustext="+response.statustext);
                });

        };
        $scope.edit = function (person) {
            $location.path("/edit/" + person.id);
        }
    })

    .controller('EditController', function ($scope, $location, $routeParams, SearchService) {
        SearchService.fetch($routeParams.id).then(function (response) {
            $scope.person = response.data;
        });

        $scope.save = function() {
            SearchService.save($scope.person).then(function(response) {
                $location.path("/localitza/" + $scope.person.name);
            });
        }
    })






;

