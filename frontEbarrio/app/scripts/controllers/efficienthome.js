'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:EfficienthomeCtrl
 * @description
 * # EfficienthomeCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('EfficienthomeCtrl', function () {
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
