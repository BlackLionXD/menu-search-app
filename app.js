angular.module('NarrowItDownApp',[])

.service('MenuSearchService', ['$http', function($http) {
    this.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: 'GET',
            url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
        }).then(function(response) {
            var foundItems = [];
            var menuItems = response.data;
            console.log('menuItems',menuItems)
            if (menuItems) {
                for (var key in menuItems) {
                    if (menuItems.hasOwnProperty(key)) {
                        var category = menuItems[key];
                        var categoryItems = category.menu_items;
                        console.log('categoryItems',categoryItems);
                        for (var i = 0; i < categoryItems.length; i++) {
                            var description = categoryItems[i].description;
                            console.log('description',description)
                            if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                                foundItems.push(categoryItems[i]);
                            }
                        }
                        console.log('founditems',foundItems);
                    }
                }
            }
            console.log('foundItems',foundItems);
            return foundItems;
        }).catch(function(error) {
            console.error('Error fetching menu items:', error);
            return []; // Return empty array in case of error
        });
    };
}])

.controller('helloController',($scope)=>{
    $scope.message = 'Hello World';
})

.controller('NarrowItDownController',['$scope','MenuSearchService', function($scope,MenuSearchService){
    $scope.searchValue = '';
    $scope.foundItems = [];
    $scope.errorMessage = '';
    $scope.isAlert = false
    $scope.searchMenuItem = function() {
        if ($scope.searchValue.trim() === '') {
            $scope.foundItems = [];
            $scope.errorMessage = 'Nothing found';
            $scope.isAlert = true
            return;
        }

        MenuSearchService.getMatchedMenuItems($scope.searchValue)
        .then(function(foundItems) {
            $scope.foundItems = foundItems;
            if ($scope.foundItems.length === 0) {
                $scope.isAlert = true;
                $scope.errorMessage = 'Nothing found';
            } else {
                $scope.errorMessage = '';
            }
        })
        .catch(function(error) {
            console.error('Error fetching menu items:', error);
            $scope.errorMessage = 'Error fetching menu items';
        });
    };

    $scope.removeItem = function(index) {
        $scope.foundItems.splice(index, 1);
    };
}])

.directive('foundItems', function() {
    return {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
            items: '=',
            onRemove: '&'
        }
    };
});
