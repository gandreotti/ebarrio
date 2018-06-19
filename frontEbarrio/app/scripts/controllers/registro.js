'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:RegistroCtrl
 * @description
 * # RegistroCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('RegistroCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     
    console.log($scope.nombre);    
    
    $scope.insert=function(){   
        var result=confirm("¿Desea registrarse en la plataforma?");
        if (result) {   
        	console.log($scope.nombre);
            $http.post("insert_user.php", {
                'nombre':$scope.nombre,
                'contrasena':$scope.contrasena,
                'correo':$scope.correo
            }).then(function(data, status, headers, config){
                    console.log("Data Inserted Successfully");
                    console.log(data.data);
                    console.log("dato enviados");
                    console.log($scope.nombre);
                    console.log($scope.apellido);
                    console.log($scope.correo);
                    alert("Usuario Agregado con exito");
                    window.location.href='#!/';
                },function(error){
                    alert("Lo lamentamos! Tenemos problemas para guardar tu usuario, intenta mas tarde");
                     });
}
  }});
