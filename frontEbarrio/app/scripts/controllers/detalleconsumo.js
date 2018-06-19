'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:DetalleconsumoCtrl
 * @description
 * # DetalleconsumoCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('DetalleconsumoCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  //       $http.get("https://api.mlab.com/api/1/databases/efficientmdb/collections/ConsumoDia?q={%22nombre%22:%22Franco%22}&apiKey=7K2Y6doZUobEqRHLROy1D26_rHQOL89B")
  //   .then(function(response) {
  //       var data = eval(response.data);
  //       var f   = data[11].fecha;
  //       var c   = data[11].costokwh;
  //       var f1   = data[12].fecha;
  //       var c1   = data[12].costokwh;
  //       var f2  = data[13].fecha;
  //       var c2   = data[13].costokwh;
  //       var f3   = data[14].fecha;
  //       var c3   = data[14].costokwh;
  //       var f4   = data[15].fecha;
  //       var c4   = data[15].costokwh;
  //       var f5  = data[16].fecha;
  //       var c5   = data[16].costokwh;
  //       var f6   = data[17].fecha;
  //       var c6   = data[17].costokwh;
  //       var f7   = data[18].fecha;
  //       var c7   = data[18].costokwh;
  //       var f8  = data[19].fecha;
  //       var c8   = data[19].costokwh;
  //       var f9   = data[20].fecha;
  //       var c9   = data[20].costokwh;
  //       var f10   = data[21].fecha;
  //       var c10   = data[21].costokwh;
  //       var f11  = data[22].fecha;
  //       var c11   = data[22].costokwh;
  //       var f12   = data[23].fecha;
  //       var c12   = data[23].costokwh;
  //       var f13   = data[24].fecha;
  //       var c13   = data[24].costokwh;
  //       var f14  = data[25].fecha;
  //       var c14   = data[25].costokwh;
  //       var f15   = data[26].fecha;
  //       var c15   = data[26].costokwh;
  //       var f16   = data[27].fecha;
  //       var c16   = data[27].costokwh;
  //       var f17  = data[28].fecha;
  //       var c17   = data[28].costokwh;
  //       var f15   = data[29].fecha;
  //       var c15   = data[29].costokwh;
  //       var f16   = data[30].fecha;
  //       var c16   = data[30].costokwh;
  //       var f17  = data[31].fecha;
  //       var c17   = data[31].costokwh;
  //       console.log("dato f::");
  //       console.log(f);

  //       $scope.suma=c+c1+c2+c3+c4+c5+c6+c7+c8+c9+c10+c11+c12+c13+c14+c15+c16+c17;
  //       var prom= sessionStorage.getItem("prom");
  //       var dia = prom/30
  //       console.log(response.data);
        
  //      $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
  //       $scope.labels = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17];
  // $scope.series = ['Pesos $', 'Kwh'];

  // $scope.data = [
  //   [c,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17],
  //   [dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia,dia]
  // ];
  // $scope.datasetOverride = [
  //     {
  //       label: "Bar chart",
  //       borderWidth: 1,
  //       type: 'bar'
  //     },
  //     {
  //       label: "Line chart",
  //       borderWidth: 3,
  //       hoverBackgroundColor: "rgba(255,99,132,0.4)",
  //       hoverBorderColor: "rgba(255,99,132,1)",
  //       type: 'line'
  //     }
  //   ];
  //   });
  $scope.consumo = function(){
        $http({
            method: 'GET',
            url: 'https://api.mlab.com/api/1/databases/efficientmdb/collections/ConsumoDia?q={%22nombre%22:%22Franco%22}&apiKey=7K2Y6doZUobEqRHLROy1D26_rHQOL89B'
            
            })
      .then(function(respuesta) {
          $scope.consumos = respuesta.data ;
          console.log($scope.consumos);
          // toastr.success('done', 'Correcto');

          $scope.labels = [$scope.consumos[0].fecha , $scope.consumos[1].fecha, $scope.consumos[2].fecha, $scope.consumos[3].fecha
    ,$scope.consumos[4].fecha, $scope.consumos[5].fecha, $scope.consumos[6].fecha, $scope.consumos[7].fecha, $scope.consumos[8].fecha, $scope.consumos[9].fecha, $scope.consumos[10].fecha
    ,$scope.consumos[11].fecha, $scope.consumos[12].fecha, $scope.consumos[13].fecha, $scope.consumos[14].fecha, $scope.consumos[15].fecha, $scope.consumos[16].fecha, $scope.consumos[17].fecha
    ,$scope.consumos[18].fecha, $scope.consumos[19].fecha, $scope.consumos[20].fecha, $scope.consumos[21].fecha, $scope.consumos[22].fecha, $scope.consumos[23].fecha, $scope.consumos[24].fecha
    ,$scope.consumos[25].fecha, $scope.consumos[26].fecha, $scope.consumos[27].fecha, $scope.consumos[28].fecha, $scope.consumos[29].fecha, $scope.consumos[30].fecha, $scope.consumos[31].fecha
    ,$scope.consumos[32].fecha];
  $scope.series = ['Series A', 'Series B'];

   $scope.data = [
    [$scope.consumos[0].costokwh , $scope.consumos[1].costokwh, $scope.consumos[2].costokwh, $scope.consumos[3].costokwh
    ,$scope.consumos[4].costokwh, $scope.consumos[5].costokwh, $scope.consumos[6].costokwh, $scope.consumos[7].costokwh, $scope.consumos[8].costokwh, $scope.consumos[9].costokwh, $scope.consumos[10].costokwh
    ,$scope.consumos[11].costokwh, $scope.consumos[12].costokwh, $scope.consumos[13].costokwh, $scope.consumos[14].costokwh, $scope.consumos[15].costokwh, $scope.consumos[16].costokwh, $scope.consumos[17].costokwh
    ,$scope.consumos[18].costokwh, $scope.consumos[19].costokwh, $scope.consumos[20].costokwh, $scope.consumos[21].costokwh, $scope.consumos[22].costokwh, $scope.consumos[23].costokwh, $scope.consumos[24].costokwh
    ,$scope.consumos[25].costokwh, $scope.consumos[26].costokwh, $scope.consumos[27].costokwh, $scope.consumos[28].costokwh, $scope.consumos[29].costokwh, $scope.consumos[30].costokwh, $scope.consumos[31].costokwh
    ,$scope.consumos[32].costokwh],
      ];
        },  
  
      function() { // optional
            //toastr.error('Error faltan datos', 'Error');
            // $location.path('/');
        });
    }
var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
  });
