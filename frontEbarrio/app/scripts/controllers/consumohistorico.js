'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:ConsumohistoricoCtrl
 * @description
 * # ConsumohistoricoCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')

  .controller('ConsumohistoricoCtrl', function ($scope, $http, almacenador) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.consumos = []
    $scope.usuario= sessionStorage.getItem("usuario");

   

    $scope.consumo = function()
    {
          $http({
                method: 'GET',
                url: almacenador.getUrl()+'/API/verconsumoid',
                params: {"correo": $scope.usuario }
                })
          .then(function(response) {
                $scope.consumos = response.data ;
                console.log($scope.consumos);
              // toastr.success('done', 'Correcto');

                $scope.labels = [$scope.consumos.mes_uno , $scope.consumos.mes_dos, $scope.consumos.mes_tres, $scope.consumos.boleta_cuatro
                , $scope.consumos.mes_cinco, $scope.consumos.mes_seis];
                $scope.series = ['Series A'];

                $scope.data = [
                [$scope.consumos.boleta_uno , $scope.consumos.boleta_dos, $scope.consumos.boleta_tres, $scope.consumos.boleta_cuatro
                  , $scope.consumos.boleta_cinco, $scope.consumos.boleta_seis]
                ];
                $scope.promedio = ((parseInt($scope.consumos.boleta_uno)+
                                           parseInt($scope.consumos.boleta_dos)+
                                           parseInt($scope.consumos.boleta_tres)+
                                           parseInt($scope.consumos.boleta_cuatro)+
                                           parseInt($scope.consumos.boleta_cinco)+
                                           parseInt($scope.consumos.boleta_seis))/6);
                $scope.prom=Math.round($scope.promedio);
                
                sessionStorage.setItem("prom", $scope.promedio);
                console.log("promedio consumo");
                console.log(sessionStorage.getItem("prom"));
                        
        });
  }

  $scope.guardarConsumo = function(){
     $http({
     method: 'POST',
     url: 'insert_consumo.php',
     params: {"promedio": $scope.prom ,"correo": $scope.usuario }
    })
     .then(function(response) {
      $scope.myWelcome = response.data;
      });
                
  }
    //     $http({
    //         method: 'GET',
    //         url: 'http://localhost:8080/API/verconsumoid',
    //         params: {"correo": $scope.usuario }
    //         })
    //   .then(function(respuesta) {
    //       $scope.consumos = respuesta.data ;
    //       console.log($scope.consumos);
    //       // toastr.success('done', 'Correcto');

    //       $scope.labels = [$scope.consumos.mes_uno , $scope.consumos.mes_dos, $scope.consumos.mes_tres, $scope.consumos.boleta_cuatro
    //             , $scope.consumos.mes_cinco, $scope.consumos.mes_seis];
    //       $scope.series = ['Series A'];

    //       $scope.data = [
    //         [$scope.consumos.boleta_uno , $scope.consumos.boleta_dos, $scope.consumos.boleta_tres, $scope.consumos.boleta_cuatro
    //           , $scope.consumos.boleta_cinco, $scope.consumos.boleta_seis]
    //         ];
    //       $scope.promedio = ((parseInt($scope.consumos.boleta_uno)+
    //                                    parseInt($scope.consumos.boleta_dos)+
    //                                    parseInt($scope.consumos.boleta_tres)+
    //                                    parseInt($scope.consumos.boleta_cuatro)+
    //                                    parseInt($scope.consumos.boleta_cinco)+
    //                                    parseInt($scope.consumos.boleta_seis))/6);
    //      },
    // function() { // optional
    //         //toastr.error('Error faltan datos', 'Error');
    //         // $location.path('/');
    //     };

    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
  
    
    
  
  });
