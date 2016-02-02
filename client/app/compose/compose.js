'use strict';

angular.module('ranaAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('compose', {
        url: '/compose',
        templateUrl: 'app/compose/compose.html',
        controller: 'ComposeController',
        controllerAs: 'main'
      });
  });
