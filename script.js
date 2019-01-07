(function(angular) {
  'use strict';

var app = angular.module('app', ['ngRoute']);

app.controller('baseCtrl', function($scope) {
  
});
app.controller('PeopleController', function($scope, $route, $routeParams, $location) {
   $scope.$route = $route;
   $scope.$location = $location;
   $scope.$routeParams = $routeParams;
});

app.controller('detailsController', function($scope, $routeParams, pservice) {
   $scope.name = 'detailsController';
   $scope.params = $routeParams;
   $scope.person = pservice.getPerson();
   $scope.messages = new Array();
   $scope.full = $scope.person.rating;
   $scope.empty = 5 - parseInt($scope.full);
   $scope.likesNum = $scope.person.Likes.length;
   $scope.dislikesNum = $scope.person.Dislikes.length;
   $scope.totalRows = ($scope.likesNum >= $scope.dislikesNum)?$scope.likesNum:$scope.dislikesNum;
    $scope.convert = function(num) {
        return new Array(num);
    }
    $scope.send=function(){
      var x = document.getElementById("myArea").value;
      alert(x);
    }
});


app.component('navbar', {
  templateUrl: 'navbar.html',
  controller: navbarController
});
app.component('sidebar', {
  templateUrl: 'sidebar.html',
  controller: sidebarController,
  controllerAs: 'name'
});

app.service('pservice', function($http) {
  var person;
  this.getName = function() {
    return $http.get('people.json');
  };
  this.setPerson = function(person) {
    this.person = person;
  }
  this.getPerson = function() {
    return this.person;
  }
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/person/:person', {
    templateUrl: 'details.html',
    controller: 'detailsController',
    }
  )
});

function navbarController($scope) {}
function sidebarController($scope, $location, pservice) {
  var name = this;
  pservice.getName().then(function(response) {
    name.people = response.data.People;
  });

  $scope.viewPerson = function(person) {
    pservice.setPerson(person);
    $scope.person = person;
    $location.path('/person/' + person.name);
  };
}
})(window.angular);