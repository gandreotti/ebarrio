'use strict';

/**
 * @ngdoc function
 * @name ebarrioApp.controller:SubirCtrl
 * @description
 * # SubirCtrl
 * Controller of the ebarrioApp
 */
angular.module('ebarrioApp')
  .controller('SubirCtrl', function ($scope, upload) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.uploadFile = function()
    {
        var name = $scope.name;
        var file = $scope.file;
        console.log(name);
        console.log(file);
        
        upload.uploadFile(file, name).then(function(res)
        {
            console.log(res);
        })
    }
     var vm=this;
    vm.menutemplate={
      url:'views/menu.html'
    };
  })
.directive('uploaderModel', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) 
        {
            iElement.on("change", function(e)
            {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
            });
        }
    };
}])

.service('upload', ["$http", "$q", function ($http, $q) 
{
    this.uploadFile = function(file, name)
    {
        var deferred = $q.defer();
        var formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);
        return $http.post("server.php", formData, {
            headers: {
                "Content-type": undefined
            },
            transformRequest: angular.identity
        })
        .then(function successCallback(res)
        {
            deferred.resolve(res);
        }
        ,function errorCallback(msg, code)
        {
            deferred.reject(msg);
        });
        return deferred.promise;
    }   
}])
