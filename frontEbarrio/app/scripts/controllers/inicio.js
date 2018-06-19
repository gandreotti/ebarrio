'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:InicioCtrl
 * @description
 * # InicioCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('InicioCtrl', function ($scope,$http,almacenador) {
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
    toastr.success('Bienvenido '+ $scope.usuario );
  

  

          $http({
                method: 'GET',
                url: almacenador.getUrl()+'/API/verusuariosid',
               params: {"correo": $scope.usuario }
                })
          .then(function(response) {
                $scope.usuarios = response.data ;
                console.log($scope.usuarios);
                console.log($scope.usuarios.idusuarios);
                sessionStorage.setItem("id",$scope.usuarios.idusuarios);
              // toastr.success('done', 'Correcto');            
                        
        });
         
 

    // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();
 // Show sideNav
  $('.button-collapse').sideNav('show');
  // Hide sideNav
  $('.button-collapse').sideNav('hide');
  // Destroy sideNav
  $('.button-collapse').sideNav('destroy');
  
     $(document).ready(function(){
      
    $('.slider').slider();
      // Pause slider
    $('.slider').slider('pause');
    // Start slider
    $('.slider').slider('start');
    // Next slide
    $('.slider').slider('next');
    // Previous slide
    $('.slider').slider('prev');
      });
  });
