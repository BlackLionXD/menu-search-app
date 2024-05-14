

angular.module('NarrowItDownApp',[])

.controller('helloController',($scope)=>{
    $scope.message = 'Hello World';
})

.controller('NarrowItDownController',['$scope', function($scope){
        $scope.searchValue = '';
}])