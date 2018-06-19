'use strict';

/**
 * @ngdoc overview
 * @name ebarrioApp
 * @description
 * # ebarrioApp
 *
 * Main module of the application.
 */
angular
  .module('ebarrioApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        // controller: 'homeController',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        controllerAs: 'menu'
      })
      .when('/inicio', {
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl',
        controllerAs: 'inicio'
      })
      .when('/casillaproyectos', {
        templateUrl: 'views/casillaproyectos.html',
        controller: 'CasillaproyectosCtrl',
        controllerAs: 'casillaproyectos'
      })
      .when('/crearproyecto', {
        templateUrl: 'views/crearproyecto.html',
        controller: 'CrearproyectoCtrl',
        controllerAs: 'crearproyecto'
      })
      .when('/listaproyectos', {
        templateUrl: 'views/listaproyectos.html',
        controller: 'ListaproyectosCtrl',
        controllerAs: 'listaproyectos'
      })
      .when('/hcarbono', {
        templateUrl: 'views/hcarbono.html',
        controller: 'HcarbonoCtrl',
        controllerAs: 'hcarbono'
      })
      .when('/registro', {
        templateUrl: 'views/registro.html',
        controller: 'RegistroCtrl',
        controllerAs: 'registro'
      })
      .when('/editar/:id', {
        templateUrl: 'views/editar.html',
        controller: 'EditarCtrl',
        controllerAs: 'editar'
      })
      .when('/detallecasilla/', {
        templateUrl: 'views/detallecasilla.html',
        controller: 'DetallecasillaCtrl',
        controllerAs: 'detallecasilla'
      })
      .when('/proyectos', {
        templateUrl: 'views/proyectos.html',
        controller: 'ViewProyectosCtrl',
        controllerAs: 'proyectos'
      })
      .when('/efficient', {
        templateUrl: 'views/efficient.html',
        controller: 'EfficientCtrl',
        controllerAs: 'efficient'
      })
      .when('/aportes', {
        templateUrl: 'views/aportes.html',
        controller: 'AportesCtrl',
        controllerAs: 'aportes'
      })
      .when('/loginadmin', {
        templateUrl: 'views/loginadmin.html',
        controller: 'LoginadminCtrl',
        controllerAs: 'loginadmin'
      })
      .when('/ingresoconsumo', {
        templateUrl: 'views/ingresoconsumo.html',
        controller: 'IngresoconsumoCtrl',
        controllerAs: 'ingresoconsumo'
      })
      .when('/reloj', {
        templateUrl: 'views/reloj.html',
        controller: 'RelojCtrl',
        controllerAs: 'reloj'
      })
      .when('/detalles/:id', {
        templateUrl: 'views/detalles.html',
        controller: 'ViewCtrl',
        controllerAs: 'detalles'
      })
      .when('/subir/:id', {
        templateUrl: 'views/subir.html',
        controller: 'SubirCtrl',
        controllerAs: 'subir'
      })
      .when('/consumoactual', {
        templateUrl: 'views/consumoactual.html',
        controller: 'ConsumoactualCtrl',
        controllerAs: 'consumoactual'
      })
      .when('/consumohistorico', {
        templateUrl: 'views/consumohistorico.html',
        controller: 'ConsumohistoricoCtrl',
        controllerAs: 'consumohistorico'
      })
      .when('/detalleconsumo', {
        templateUrl: 'views/detalleconsumo.html',
        controller: 'DetalleconsumoCtrl',
        controllerAs: 'detalleconsumo'
      })
      .when('/efficienthome', {
        templateUrl: 'views/efficienthome.html',
        controller: 'EfficienthomeCtrl',
        controllerAs: 'efficienthome'
      })
      .when('/detallesproyecto', {
        templateUrl: 'views/detallesproyecto.html',
        controller: 'DetallesproyectoCtrl',
        controllerAs: 'detallesproyecto'
      })
      .when('/inicioadmin', {
        templateUrl: 'views/inicioadmin.html',
        controller: 'InicioadminCtrl',
        controllerAs: 'inicioadmin'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
// .controller("BarCtrl", function ($scope,Consumohistorico,$routeParams,$http,$rootScope) {
//   $scope.fecha = new Date(Date.now())
//     $scope.fecha2 = new Date(Date.now())
//     $scope.fecha3 = new Date(Date.now())
//     $scope.fecha4 = new Date(Date.now())
//     $scope.fecha5 = new Date(Date.now())
//     $scope.fecha6 = new Date(Date.now())
//     $scope.fecha.setMonth($scope.fecha.getMonth() - 1)
//     $scope.fecha2.setMonth($scope.fecha2.getMonth() - 2)
//     $scope.fecha3.setMonth($scope.fecha3.getMonth() - 3)
//     $scope.fecha4.setMonth($scope.fecha4.getMonth() - 4)
//     $scope.fecha5.setMonth($scope.fecha5.getMonth() - 5)
//     $scope.fecha6.setMonth($scope.fecha6.getMonth() - 6)
//     $scope.fecha=$scope.fecha.toJSON().slice(0,10).replace(/-/g,'/') 
//     $scope.fecha2=$scope.fecha2.toJSON().slice(0,10).replace(/-/g,'/') 
//     $scope.fecha3=$scope.fecha3.toJSON().slice(0,10).replace(/-/g,'/') 
//     $scope.fecha4=$scope.fecha4.toJSON().slice(0,10).replace(/-/g,'/') 
//     $scope.fecha5=$scope.fecha5.toJSON().slice(0,10).replace(/-/g,'/') 
//     $scope.fecha6=$scope.fecha6.toJSON().slice(0,10).replace(/-/g,'/')
//     // var id = $routeParams.id;    
//     // Consumohistorico.get({id: id}, function (data) {
//     //         console.log(data.response);
//     //         $scope.consumohistorico = data.response;
//     //         console.log("consumo historico:::::");
//     //         console.log(data.response);
//     //     }) 
//     $scope.usuario= sessionStorage.getItem("usuario");
// console.log("estoy antes de selectgrafico");
//  $http.get("selectgrafico.php",{
//                 'usuario':$scope.usuario})
//     .then(function(response) {
//         var data = eval(response.data);
//         var e   = data[0];
//         var f   = data[1];
//         var m   = data[2];
//         var a   = data[3];
//         var ma  = data[4];
//         var j   = data[5];
//         var b1   = data[6];
//         var b2   = data[7];
//         var b3   = data[8];
//         var b4   = data[9];
//         var b5  = data[10];
//         var b6   = data[11];
//         var c1   = data[12];
//         var c2   = data[13];
//         var c3   = data[14];
//         var c4   = data[15];
//         var c5  = data[16];
//         var c6   = data[17];

//         var promedio=(e+f+m+a+ma+j)/6;
//         sessionStorage.setItem("prom", promedio);
//         var promedio1=(e+f+m+a+ma+j)/6;
//         console.log(response.data);
//         console.log("dato e::");
//         console.log(e);
//         console.log(f);
//        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
//         $scope.labels = [c1,c2,c3,c4,c5,c6];
//   $scope.series = ['Pesos $', 'Kwh'];

//   $scope.data = [
//     [e,f,m,a,ma,j],
//     [promedio,promedio,promedio,promedio1,promedio1,promedio1]
//   ];
//   $scope.datasetOverride = [
//       {
//         label: "Bar chart",
//         borderWidth: 1,
//         type: 'bar'
//       },
//       {
//         label: "Line chart",
//         borderWidth: 3,
//         hoverBackgroundColor: "rgba(255,99,132,0.4)",
//         hoverBorderColor: "rgba(255,99,132,1)",
//         type: 'line'
//       }
//     ];
//     });
   

//       // $scope.labels = [$scope.fecha, $scope.fecha2, $scope.fecha3, $scope.fecha4, $scope.fecha5, $scope.fecha6];
//       // $scope.series = ['Series A', 'Series B'];

  
      

  
  
// })

  .controller('HomeCtrl', ['$scope', 'Proyectos', '$route', function ($scope, Proyectos, $route) {
  var vm=this;
    vm.menutemplate={
    url:'views/menu.html'
    };
        Proyectos.get(function (data) {
            $scope.proyectos = data.response;
        })

        $scope.remove = function (id) {
          var result = confirm("¿Seguro que quiere eliminar este proyecto?");
    if (result) {
            Proyectos.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }}
    }])

  .controller('CreateCtrl', ['$scope', 'Proyectos', function ($scope, Proyectos) {
      var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
        $scope.settings = {
            pageTitle: "Agregar Proyecto",
            action: "Agregar"
        };

        
        $scope.proyecto = {
            idproyecto: "",
            descripcion: "",
            region: "",
            ciudad: "",
            estado: "",
            requisito: "",
            ahorro: "",
            duracion: ""
        };

        $scope.submit = function () {
          var result = confirm("Se agregará un nuevo proyecto, ¿Desea continuar?");
          if (result) {
            Proyectos.save({proyecto: $scope.proyecto}).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.proyecto);
                    $scope.settings.success = "El Proyecto ha sido creado correctamente!";
                    alert("El proyecto ha sido guardado con exito");
                     window.location.href='#!/listaproyectos';
                }
                else{
                  alert("no se pudo guardar el proyecto");
                }
            })
        }}
    }])

    .controller('EditCtrl', ['$scope', 'Proyectos', '$routeParams', function ($scope, Proyectos, $routeParams) {
      var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
        $scope.settings = {
            pageTitle: "Editar Proyectos",
            action: "Editar"
        };

        var id = $routeParams.id;

        Proyectos.get({id: id}, function (data) {
            $scope.proyecto = data.response;
        });

        $scope.submit = function () {
          var result = confirm("¿Seguro que quiere editar este proyecto?");
    if (result) {
            Proyectos.update({proyecto: $scope.proyecto}, function (data) {
                $scope.settings.success = "El usuario ha sido editada correctamente!";
                alert("El proyecto ha sido editado con exito");
                     window.location.href='#!/listaproyectos';
            });
        }}
    }])

    


    .controller('ViewProyectosCtrl',['$scope','Proyectos','$routeParams', '$route', function($scope,Proyectos,$routeParams, $route){
      var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
    var id = $routeParams.id;
     Proyectos.get({id: id}, function (data) {
            console.log(data.response);
            $scope.proyectos = data.response;
        })
      $scope.remove = function (id) {
            Proyectos.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])

    

