'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:CasillaproyectosCtrl
 * @description
 * # CasillaproyectosCtrl
 * Controller of the ebarrioApp
 */

angular.module('ebarrioApp')

  .controller('CasillaproyectosCtrl', function ($scope,$http, almacenador) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
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
          console.log($scope.proyectos);

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
       sessionStorage.setItem("pid",pid);}
      //   $http({
      //       method: 'GET',
      //       url: 'http://localhost:8080/API/verproyectoid',
      //       params: {"id": pid }
      //       })
      // .then(function(respuesta) {
      //     $scope.detalles = respuesta.data ;
      //      sessionStorage.setItem("detalles",$scope.detalles);
      //     console.log(respuesta);
      //     console.log("proyecto");
      //     console.log($scope.detalles);
      //     // toastr.success('done', 'Correcto');
      //   }, 
      // function() { // optional
      //       //toastr.error('Error faltan datos', 'Error');
      //       // $location.path('/');
      //   });
    
    
     $scope.update = function (id) {
          var result = confirm("¿Seguro que quiere aprobar este proyecto?");
    if (result) {
            $http.post("Estado.php", {
                'id':id
            }).then(function(data, status, headers, config){
                    console.log("Data Inserted Successfully");
                    console.log(data.data);
                    alert("Proyecto aprobado con exito");
                    window.location.href='#!/inicio';
                },function(error){
                    alert("Lo lamentamos! Tenemos problemas para guardar tu preferencia, intenta mas tarde");
                     });
}
        }
      
  });
