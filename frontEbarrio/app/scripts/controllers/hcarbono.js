'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:HcarbonoCtrl
 * @description
 * # HcarbonoCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('HcarbonoCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm=this;
    vm.menutemplate={
    	url:'views/menu.html'
    };
     $(document).ready(function(){
    $('.collapsible').collapsible();
  });
  });
