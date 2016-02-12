'use strict';

adopteitorApp.factory('enAdopcion', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/Animal/', null, {'query':{method: 'GET', isArray: true}});
}]);

adopteitorApp.factory('enAdopcionPorID', ['$resource', 'ENV', function($resource, ENV){
    return $resource(
        ENV.apiEndpoint+'/Animal/:id/',
        {id:'@id'},
        {'query':{method: 'GET', isArray: false}}
    );
}]);

adopteitorApp.controller('GalgosEnAdopcion', ['$scope', '$location', 'enAdopcion', '$uibModal', 'ENV',
    function ($scope, $location, enAdopcion, $uibModal, ENV) {

              $scope.galgosEnAdopcion = enAdopcion.query();
              $scope.galgosEnAdopcion.$promise.then(function(data) {
                  $scope.galgosEnAdopcionRes = data.results;
              });
              $scope.apiEndpoint = ENV.apiEndpoint;
              $scope.saberMas = function(id){
                  $scope.id = id;
                  var modalInstance = $uibModal.open({
                      templateUrl: 'views/saber_mas.html',
                      controller: 'enAdopcionPorID',
                      scope: $scope
                  });
              }
    }
]);

adopteitorApp.controller('enAdopcionPorID', ['$scope', '$location', 'enAdopcionPorID', '$uibModal',
    function ($scope, $location, enAdopcionPorID, $uibModal) {

              $scope.enAdopcionPorID = enAdopcionPorID.query({},{'id': $scope.id});

              $scope.enAdopcionPorID.$promise.then(function(data) {
                     $scope.enAdopcion = data;
                }, function(error) {
                    console.log('error', error);
                }
          );
    }
]);
