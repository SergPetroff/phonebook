'use strict';

var myApp = angular.module('phoneBook', ['angularUtils.directives.dirPagination']);

function phonelistCtrl($scope, $http) {
	$scope.title = "Телефонный справочник";
  
  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.listempl = [];


  // Получение данных JSON
    $http.get('bd/exampledata.json').success(function(data, status, headers){
      $scope.listempl = data;
        
      $scope.pageChangeHandler = function(num) {
            //console.log('meals page changed to ' + num);
        };

        

    });

  // Вывод CSS класса для иконки состояния работника
  $scope.getClass = function getClass(idx, state, fio) {
    //state.indexOf("На территории")
        return {
            emplinside: state.indexOf("На территории") ? 0 : -1,
            emploutside: state.indexOf("За территорией") ? 0 : -1,
            emplholydays: state.indexOf("Отпуск") ? 0 : -1,
            emplworktrip: state.indexOf("Командировка") ? 0 : -1
          };
        };


}

myApp.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }

        
        var result = [];
        
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
          //console.log(item.FIO)
          if(item.FIO.toLowerCase().indexOf(searchString) !== -1){
              result.push(item);
          }
          
          if(item.Phone_internal.replace("-","").indexOf(searchString) !== -1){
              result.push(item);
          }
        });
        return result;
    };
});


myApp.controller('phonelistCtrl', phonelistCtrl);


myApp.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show').addClass('animated swing');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});


$(document).ready(function(){
    //$('[data-toggle="tooltip"]').tooltip();
    //$('.testtlt').tooltip('show') 
   // $('a').tooltip();
   $('[data-toggle=tooltip]').hover(function(){
        // on mouseenter
        $(this).tooltip('show');
    }, function(){
        // on mouseleave
        $(this).tooltip('hide');
    });

});