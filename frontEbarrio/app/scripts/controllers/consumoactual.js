'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:ConsumoactualCtrl
 * @description
 * # ConsumoactualCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('ConsumoactualCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
    
    console.log("get");
    $http({
  method: 'GET',
  url: 'https://api.mlab.com/api/1/databases/efficientmdb/collections/ConsumoMes?apiKey=7K2Y6doZUobEqRHLROy1D26_rHQOL89B'
}).then(function successCallback(response) {
	$scope.consumo = response.data;
	console.log(response.data);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    
  });
$scope.consumo = function(){
        $http({
            method: 'GET',
            url: 'https://api.mlab.com/api/1/databases/efficientmdb/collections/ConsumoDia?apiKey=7K2Y6doZUobEqRHLROy1D26_rHQOL89B'
            
            })
      .then(function(respuesta) {
          $scope.consumos = respuesta.data ;
          console.log($scope.consumos);
          // toastr.success('done', 'Correcto');

          $scope.labels = [$scope.consumos[0].fecha , $scope.consumos[1].fecha];
  $scope.series = ['Series A', 'Series B'];

   $scope.data = [
    [$scope.consumos[0].costokwh , $scope.consumos[1].costokwh],
      ];
        },  
  
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });
    }
 


  
      // .error(function(data, status, headers, config) {
      //   $scope.errorMsg = 'Unable to LOGIN';
      // })
            
  


  });
