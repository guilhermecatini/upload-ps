'use strict'

const app = angular.module('MyApp', ['ui.router'])

app.value('APIHOST', 'http://' + window.location.host )

app.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/signin')

  $stateProvider

  .state('signup', {
    url: '/signup',
    templateUrl: '../partials/signup.html',
    controller: 'UserController',
    controllerAs: 'vm'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: '../partials/signin.html',
    controller: 'UserController',
    controllerAs: 'vm'
  })

  .state('menu', {
    templateUrl: '../partials/menu.html',
    controller: 'UserController',
    controllerAs: 'vm'
  })

  .state('menu.home', {
    url: '/home',
    templateUrl: '../partials/home.html',
    controller: 'ImageController',
    controllerAs: 'vm'
  })

  .state('menu.images', {
    url: '/images',
    templateUrl: '../partials/images.html',
    controller: 'ImageController',
    controllerAs: 'vm'
  })

  

})