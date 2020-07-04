/// <reference path="angular.js" />

var myApp=angular.module('demoApp', []);

myApp.service('arithOpsService', function () {

    this.add = function (a, b) {
        var result = parseInt(a) + parseInt(b);
        return result;
    };

    this.sub = function (a, b) {
        return a - b;
    };

    this.mul = function (a, b) {
        return a * b;
    };

    this.div = function (a, b) {
        return a / b;
    };
});

myApp.controller('testController', function ($scope,arithOpsService) {

    $scope.doArithOp = function (input) {

        switch (input) {
            case 1: var result = arithOpsService.add($scope.firstNumber, $scope.secondNumber);
                $scope.resultMessage = "Addition Result is : " + result;
                break;

            case 2: var result = arithOpsService.sub($scope.firstNumber, $scope.secondNumber);
                $scope.resultMessage = "Subtraction Result is : " + result;
                break;

            case 3: var result = arithOpsService.mul($scope.firstNumber, $scope.secondNumber);
                $scope.resultMessage = "Multiplication Result is : " + result;
                break;

            case 4: var result = arithOpsService.div($scope.firstNumber, $scope.secondNumber);
                $scope.resultMessage = "Division Result is : " + result;
                break;
        }

    };

});