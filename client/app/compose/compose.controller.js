'use strict';

(function() {

class ComposeController {

  constructor($http, $scope) {
    this.$http = $http;
    this.newNote = {
      title: '',
      description: ''
    };
  }
  createNote = () => {
    this.$http.post('/api/notes', this.newNote).then(response => {
      console.log(response);
    });
  };
}

angular.module('ranaAppApp')
  .controller('ComposeController', ComposeController);

})();
