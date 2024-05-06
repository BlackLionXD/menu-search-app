
"use strict";

var app = angular.module('rootModule',[]);

app.controller('helloController',($scope)=>{
    $scope.message = 'Hello World';
});