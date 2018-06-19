'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:ListaproyectosCtrl
 * @description
 * # ListaproyectosCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('ListaproyectosCtrl', function ($scope,$http, almacenador) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
    $scope.usuario= sessionStorage.getItem("usuario");
   $scope.proyecto = function(){
        console.log("va la variable de sesion");
        console.log($scope.usuario);
        $http({
            method: 'GET',
            url: almacenador.getUrl()+'/API/verproyectos'
            })
      .then(function(respuesta) {
          $scope.proyectos = respuesta.data.proyectos ;
          console.log(respuesta);
          // toastr.success('done', 'Correcto');
        }, 
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });
    }
     $scope.verProyecto = function(pid){
        console.log("proyectos");
        console.log("id::");
        console.log(pid);
       sessionStorage.setItem("pid2",pid);}

       $scope.unirse= function(id,usuario){
      var result=confirm("¿Desea unirse a este proyecto?");
      if(result){
      $http.post("unir.php",{'id':id, 'usuario':usuario
    })


  .then(function(data, status, headers, config) {
         console.log("Data Inserted Successfully");
          alert("Se a unido con exito al proyecto"+ id);
        } 
      ,function(error){
        alert("Lo lamentamos no podemos unirte a un proyecto, intente más tarde")
      });
      // .error(function(data, status, headers, config) {
      //   $scope.errorMsg = 'Unable to LOGIN';
      // })
            
}
    }

  });
