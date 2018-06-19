'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:ProyectosCtrl
 * @description
 * # ProyectosCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('ProyectosCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
  });
