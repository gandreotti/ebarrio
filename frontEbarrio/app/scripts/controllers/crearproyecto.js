'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:CrearproyectoCtrl
 * @description
 * # CrearproyectoCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')

  .controller('CrearproyectoCtrl', function ($scope,$http,$route) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.usuario= sessionStorage.getItem("usuario");
    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
    

        console.log("estoy antes del submit");

        
        $scope.insert=function(){   
        var result=confirm("¿Desea postular el proyecto?");
        if (result) {   
            $http.post("insert.php", {
                'razonsocial':$scope.razonsocial,
                'rutsocial':$scope.rutsocial,
                'organizacion':$scope.organizacion,
                'telefono':$scope.telefono,
                'usuario':$scope.usuario,
                'nombre':$scope.nombre,
                'tarifa':$scope.tarifa,
                'destinatario':$scope.destinatario,
                'beneficiariodirecto':$scope.beneficiariodirecto,
                'beneficiarioindirecto':$scope.beneficiarioindirecto,
                'dimensiones':$scope.dimensiones,
                'duracion':$scope.duracion,
                'region':$scope.region,
                'meta':$scope.meta,
                'dinero':$scope.dinero,
                'aporte':$scope.aporte,
                'manodeobra':$scope.manodeobra,
                'materiales':$scope.materiales

            }).then(function(data, status, headers, config){
                    console.log("Data Inserted Successfully");
                    console.log(data.data);
                    console.log($scope.razonsocial);
                    console.log($scope.rutsocial);
                    console.log($scope.organizacion);
                    console.log($scope.nombre);
                    console.log($scope.tarifa);
                    alert("Proyecto Postulado con exito");
                    window.location.href='#!/inicio';
                },function(error){
                    alert("Lo lamentamos! Tenemos problemas para guardar tu proyecto, intenta mas tarde");
                     });
}  
  } 
  $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
  });


});
//controlaodor que permite subir imagenes al servidor 
  