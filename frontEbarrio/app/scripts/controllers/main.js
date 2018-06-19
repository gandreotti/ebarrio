'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $(document).ready(function(){
      $('.parallax').parallax();
    });
  });
