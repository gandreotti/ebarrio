'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:DetallesproyectoCtrl
 * @description
 * # DetallesproyectoCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('DetallesproyectoCtrl', function ($http,$scope, almacenador) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };

    //consol.log(almacenador.setMetohd)
    $scope.user=sessionStorage.getItem("usuario");

    $scope.pid=sessionStorage.getItem("pid2");
    console.log("id pid");
    console.log($scope.pid);

    $http({
            method: 'GET',
            url: almacenador.getUrl()+'/API/verproyectoid',
            params: {"id": $scope.pid }
            })
      .then(function(respuesta) {
          $scope.detalles = respuesta.data ;
           
          console.log(respuesta);
          console.log("detalles proyecto");
          console.log($scope.detalles);
          $scope.prom=sessionStorage.getItem("prom");
          $scope.meta=Math.round($scope.prom - (($scope.prom)*($scope.detalles.meta / 100)));
          // toastr.success('done', 'Correcto');
        }, 
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });

      
          $http({
            method: 'GET',
            url: almacenador.getUrl()+'/API/verparticipantes',
            params: {"id": $scope.pid }
            })
      .then(function(respuesta) {
          $scope.usuarios = respuesta.data ;
           
          console.log(respuesta);
          console.log("detalles de participantes");
          console.log($scope.usuarios);
          // toastr.success('done', 'Correcto');
        }, 
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });

       $http({
            method: 'GET',
            url: almacenador.getUrl()+'/API/verpromedios',
            params: {"correo": $scope.user }
            })
      .then(function(respuesta) {
          $scope.promedios = respuesta.data ;
           
          console.log(respuesta);
          console.log("detalles de promedios");
          console.log($scope.promedios);
          // toastr.success('done', 'Correcto');
        }, 
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });

      //NO ETA LLEGANDO AQUI ??
      $http({
            method: 'GET',
            url: 'https://api.mlab.com/api/1/databases/efficientmdb/collections/ConsumoMes?apiKey=7K2Y6doZUobEqRHLROy1D26_rHQOL89B',
            })
      .then(function(respuesta) {
          $scope.consumo = respuesta.data ;
          $scope.conjuntoMeses= [];
          for (var i =0; i <$scope.consumo.length; i++) {
            var validacion = true
            for (var j = 0; j < $scope.conjuntoMeses.length; j++) {
              if ($scope.consumo[i].nombre == $scope.conjuntoMeses[j].nombre) {
                $scope.conjuntoMeses[j].meses.push({
                  //anio: $scope.consumo[i].anio,
                  mes:$scope.consumo[i].mes,
                  costokwh: $scope.consumo[i].costokwh
                })
                validacion = false
              }
            }
            if(validacion){
              $scope.conjuntoMeses.push({
                nombre: $scope.consumo[i].nombre,

                meses: [
                  {
                    //anio: $scope.consumo[i].anio,
                    mes: $scope.consumo[i].mes,
                    costokwh: $scope.consumo[i].costokwh
                  }
                ]
              })
            }

          }
          //listo ... el drama ahora es que los meses corresponden a meses del año pasado y otros de este año ...
          console.log("Estructura Final");
          console.log($scope.conjuntoMeses);
          console.log("nombre usuario");
          console.log($scope.consumo.nombre);

          // toastr.success('done', 'Correcto');
        }, 
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });

      $scope.evaluarMes = function(arreglo,numero){
        for (var i =0; i <arreglo.length; i++){
          if(arreglo[i].mes == numero){
            return arreglo[i].costokwh
          }
        }
        return -1
      }
      
     

  });
