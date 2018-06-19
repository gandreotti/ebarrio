'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:AportesCtrl
 * @description
 * # AportesCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
.factory('Proyectos', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/BarrioAPI/proyectos/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])
  .controller('AportesCtrl', function ($scope,$http,Proyectos,$route) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
    var id = $route.id;
    Proyectos.get({id: id}, function (data) {
            $scope.proyecto = data.response;
        })
       $scope.insert=function(){   
        var result=confirm("¿Desea aportar a el proyecto?");
        if (result) {   
            $http.post("aporte.php", {
                'proyecto':$scope.proyecto,
                'dinero':$scope.dinero,
                'materiales':$scope.materiales,
                'trabajo':$scope.trabajo
            }).then(function(data, status, headers, config){
                    console.log("Data Inserted Successfully");
                    console.log(data.data);
                    console.log($scope.proyecto);
                    console.log($scope.dinero);
                    console.log($scope.materiales);
                    console.log($scope.trabajo);
                    alert("Aporte agregado con exito");
                    window.location.href='#!/inicio';
                },function(error){
                    alert("Lo lamentamos! Tenemos problemas para guardar tu aporte, intenta mas tarde");
                     });
}  
  }
  });
