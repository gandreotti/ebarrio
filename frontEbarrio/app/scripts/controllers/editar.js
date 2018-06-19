'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:EditarCtrl
 * @description
 * # EditarCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('EditarCtrl', function () {
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
