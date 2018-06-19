'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('MenuCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.destroy=function(){
      sessionStorage.clear();
    }

    $( document ).ready(function(){
        $('.button-collapse').sideNav();
        $('.button-collapse').sideNav('hide');
        $('.dropdown-button').dropdown({ hover: true, constrain_width: true, belowOrigin: true, alignment: 'right' });
      });
  });
