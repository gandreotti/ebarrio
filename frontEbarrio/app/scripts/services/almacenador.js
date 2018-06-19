'use strict';

/**
 * @ngdoc service
 * @name ebarrioApp.almacenador
 * @description
 * # almacenador
 * Factory in the ebarrioApp.
 */
angular.module('ebarrioApp')
  .factory('almacenador', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var url = 'http://localhost:8080'//'http://localhost:8080' //'http://ebarrio.awaresystems.cl'

    // Public API here
    return {
      getUrl: function () {
        return url;
      }
    };
  });
