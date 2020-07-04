/// <reference path="angular.js" />
var app = angular.module('employeeApp', []);

app.controller('employeeCtrl', function ($scope, $http, $timeout) {
    $scope.emplist = [];


    $http.get('http//localhost:2212/api/Employeeapi').then(function (output) {
        $scope.emplist = output.data;
    });

    //     {
    //         field: 'Id', displayName: 'Action(s)', enableFiltering: false,
    // celltemplate:'<button ng-click="grid.appScope.deleteEmployee()" ></button>' }

    $scope.deleteEmployee = function (id) {

        alert("Write the code to delete employee with ID" + id);
    };


    $scope.editEmployee = function (emp) {

        alert(JSON.stringify(emp));
    };


});