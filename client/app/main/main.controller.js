'use strict';

(function() {

class MainController {
  constructor($http, $scope) {
    this.$http = $http;
    this.notes = [];
    this.loadData();
  }
  loadData = () => {
    this.$http.get('/api/notes').then(response => {
      this.notes = response.data;
    });
  };
}

angular.module('ranaAppApp')
  .controller('MainController', MainController);

})();
