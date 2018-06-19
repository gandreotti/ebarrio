'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')

  
  .controller('LoginCtrl', function ($scope,$http,$rootScope,$location, almacenador) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];




     $scope.insertdata=function(){
      $http({
            method: 'GET',
            url: almacenador.getUrl()+'/API/login',
            params: {correo: $scope.user, contrasena: $scope.pswd}
            })
      .then(function(respuesta) {
          $scope.consumos = respuesta.data.consumos ;
          console.log(respuesta);
          sessionStorage.setItem("usuario",$scope.user);
          window.location.href = '/#!/inicio';
        }, 
      function(respuesta) { // optional
            console.log(respuesta)
            toastr.error('Usuario o contraseña incorrectos');
        });
    }
  console.log($rootScope.usuario);
  $scope.user=$rootScope.usuario;
  $scope.usuario= sessionStorage.getItem("usuario");
  console.log("session: ");
  console.log($scope.usuario);
  console.log("usuario: ");
  console.log($scope.user);

  });
