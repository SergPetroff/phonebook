'use strict';

var myApp = angular.module('phoneBook', ['angularUtils.directives.dirPagination','ui.bootstrap']);
myApp.controller('phonelistCtrl', phonelistCtrl);

function phonelistCtrl($scope, $http, $uibModal) {
	$scope.title = "Телефонный справочник";
  

  $scope.totalItems = $scope.title.length;
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.listempl = [];
  $scope.itemsPerPage = $scope.pageSize;


  // Получение данных JSON
  $http.get('bd/exampledata.json').success(function(data, status, headers){
    $scope.listempl = data;
      
    $scope.pageChangeHandler = function(num) {
          //console.log('meals page changed to ' + num);
      };
  });


  // Вывод CSS класса для иконки состояния работника
  $scope.getState = function getState(idx, state) {
    //state.indexOf("На территории")
    if(!!state){
        return {
           emplinside: state.indexOf("На территории") ? 0 : -1,
            emploutside: state.indexOf("За территорией") ? 0 : -1,
            emplholydays: state.indexOf("Отпуск") ? 0 : -1,
            emplworktrip: state.indexOf("Командировка") ? 0 : -1
          };
        }
  };
  // выводо полей Email, если заполнены
  $scope.showEmail = function showEmail(idx, email){
    if(!!email){
      //console.log(email.indexOf("@"))
      return{
        showemail:email.indexOf("@") ? -1 : 0

      };
    }
  };

  // модальное окно
  $scope.modalCard = function(person) {

        var modalInstance = $uibModal.open({
          templateUrl: 'modalcard.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
                personcard: function()
                {
                    return person;
                }
            }
       });
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
        
        var fi = item.FirstName.toLowerCase() + ' ' + item.LastName.toLowerCase(),
            nameandfam = item.LastName.toLowerCase()  + ' ' +item.FirstName.toLowerCase(),
            nameandfamandotch = item.FirstName.toLowerCase() + ' ' + item.LastName.toLowerCase() + ' ' +item.FatherName.toLowerCase(),
            fnumphone = "",
            olapnumphone = "";
              if(!!item.Phone_internal){
                fnumphone = item.Phone_internal.replace("-","");
                olapnumphone = item.Phone_internal;
              } else{
                fnumphone = "";
              }

          if(item.FirstName.toLowerCase().indexOf(searchString) !== -1 ||
              
            item.Department.toLowerCase().indexOf(searchString) !== -1 ||

            item.Position.toLowerCase().indexOf(searchString) !== -1 ||
            
            item.LastName.toLowerCase().indexOf(searchString) !== -1 ||

            /*item.FatherName.toLowerCase().indexOf(searchString) !== -1 ||*/

            fi.indexOf(searchString) !== -1 ||

            nameandfam.indexOf(searchString) !== -1 ||

            /*nameandfamandotch.indexOf(searchString) !== -1 ||*/

            fnumphone.indexOf(searchString) !== -1 ||

            olapnumphone.indexOf(searchString) !== -1 

            )

          {
              result.push(item);
          }
          
        });
        return result;
    };
});



myApp.controller('ModalInstanceCtrl', ['$scope','$uibModalInstance','personcard', function($scope, $uibModalInstance, personcard) {
  $scope.person = personcard;

/*  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $uibModalInstance.close();*/
}]);
