'use strict';

/**
 * @ngdoc directive
 * @name ebarrioApp.directive:maps
 * @description
 * # maps
 */
angular.module('ebarrioApp')
  .directive('maps', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the maps directive');
      }
    };
  });
