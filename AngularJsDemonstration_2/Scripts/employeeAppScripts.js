/// <reference path="angular.js" />
var empApp = angular.module('employeeApp', []);

empApp.service('employeeService', function ($http,$rootScope) {

    this.getAllEmployees = function () {

        $http.get('/api/EmployeeApi').then(function (result) {
            $rootScope.$broadcast('onEmployeesLoad', result.data);
        });
        //return [
        //    { Id: 101, Name: 'Abhinav', Location: 'Bangalore', Salary: 12345, DeptId: 1 },
        //    { Id: 102, Name: 'Abhishek', Location: 'Chennai', Salary: 23456, DeptId: 2 },
        //    { Id: 103, Name: 'Ajay', Location: 'Bangalore', Salary: 34567, DeptId: 2 },
        //    { Id: 104, Name: 'Anil', Location: 'Chennai', Salary: 45678, DeptId: 1 },
        //    { Id: 105, Name: 'Anirudh', Location: 'Bangalore', Salary: 56789, DeptId: 1 }
        //];
    };

    this.deleteEmployee = function (id) {
        $http.delete('/api/EmployeeApi/' + id).then(function (output) {
            $rootScope.$broadcast('onEmployeeDeleted', output.data);
        });
    };

    this.getEmployeeById = function (id) {
        $http.get('/api/EmployeeApi/' + id).then(function (output) {
            $rootScope.$broadcast('onEmployeeFetch', output.data);
        });
    };

    this.updateEmployee = function (emp) {
        $http.put('/api/EmployeeApi',emp).then(function (output) {
            $rootScope.$broadcast('onEmployeeUpdate', output.data);
        });
    };

    this.testName = 'Pragim Technologies';
});

empApp.controller('employeeCtrl', function ($scope,employeeService,$timeout) {

    $scope.resultMessage = employeeService.testName;

    $scope.employeeList = [];

    employeeService.getAllEmployees();

    $scope.$on('onEmployeesLoad', function (eventInfo, data) {
        $scope.employeeList = data;
    });

    $scope.onDelete = function (id) {
        var isConfirmed = confirm('Are you sure to Delete the Data?');

        if (isConfirmed) {
            employeeService.deleteEmployee(id);
        }
    };

    $scope.$on('onEmployeeDeleted', function (e, d) {
        if (d) {
            $scope.resultMessage = 'Employee Deleted Successfully';
            employeeService.getAllEmployees();
            $timeout(clearResultMessage, 10000);
        }
    });

    function clearResultMessage() {
        $scope.resultMessage = '';
    }

    $scope.onEdit = function (id) {
        employeeService.getEmployeeById(id);
    };

    $scope.isEdit = false;

    $scope.$on('onEmployeeFetch', function (e, result) {

        $scope.isEdit = true;

        $scope.employee = result;

        //Creates Deep Copy
        //$scope.copyEmployee = $scope.employee;

        //Creates Shallow Copy

        $scope.copyEmployee = angular.copy($scope.employee);
    });

    $scope.onEmployeeUpdate = function () {
        employeeService.updateEmployee($scope.employee);
    };

    $scope.$on('onEmployeeUpdate', function (e, result) {

        $scope.isEdit = false;

        $scope.resultMessage = 'Employee Updated Successfully';
        employeeService.getAllEmployees();

        $scope.employee = null;
    });

    $scope.isEmployeeDataChanged = false;

    $scope.$watch('employee', function (newVal, oldVal) {
        if (newVal != undefined && newVal != null && oldVal != undefined && oldVal != null) {
            if (angular.equals(newVal, $scope.copyEmployee)) {
                $scope.isEmployeeDataChanged = false;
            }
            else {
                $scope.isEmployeeDataChanged = true;
            }
            console.log('Data is Changed');
        }
    }, true);
});

empApp.controller('demoController', function ($scope, employeeService) {
    $scope.testMessage = employeeService.testName;
});