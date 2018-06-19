'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:DetallesCtrl
 * @description
 * # DetallesCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('DetallesCtrl', function () {
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
