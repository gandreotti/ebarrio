'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:DetallecasillaCtrl
 * @description
 * # DetallecasillaCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('DetallecasillaCtrl', function ($scope,$http,$route, almacenador) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.pid=sessionStorage.getItem("pid");

    $http({
            method: 'GET',
            url: almacenador.getUrl()+'/API/verproyectoid',
            params: {"id": $scope.pid }
            })
      .then(function(respuesta) {
          $scope.detalles = respuesta ;
           
          console.log(respuesta);
          console.log("proyecto detalles");
          console.log($scope.detalles);
          // toastr.success('done', 'Correcto');
        }, 
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });


   
  });
