'use strict';

var phoneBook = angular.module('phoneBook',['angularUtils.directives.dirPagination']); // Создаем модуль

phoneBook.controller('phonelistCtrl',function($scope, $http){
	$scope.list = $scope.$parent.personList
	$scope.config = {
    itemsPerPage: 5,
    fillLastPage: true
  }


	$scope.title = "Телефонный справочник";
		/*------  JSON ------*/

		$http.get('bd/getallempl.json').success(function(data, status, headers){
			//console.log('data:',data,);
			//console.log('Департамент:',Department, '\n\n ФИО:',FIO,'\n\n Телефон:',Phone_internal)
			//console.log('data:',data, '\n\n Status:',status,'\n\n Headers:',headers)
			$scope.listempl = data;
		});

		$scope.sortField = "FIO";
});