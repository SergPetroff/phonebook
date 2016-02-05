'use strict';

var myApp = angular.module('phoneBook', ['angularUtils.directives.dirPagination']);

function phonelistCtrl($scope, $http) {
	$scope.title = "Телефонный справочник";
  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.listempl = [];



    $http.get('bd/getallempl.json').success(function(data, status, headers){
      $scope.listempl = data;
        
        $scope.pageChangeHandler = function(num) {
            //console.log('meals page changed to ' + num);
        };

    });
}

myApp.controller('phonelistCtrl', phonelistCtrl);