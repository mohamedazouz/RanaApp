'use strict';

(function() {

class ComposeController {

  constructor($http, $scope, $stateParams, $state) {
    this.$http = $http;
    this.update = false;
    this.submitInProgress = false;
    this.state = $state;
    if($stateParams.id) {
      this.update = true;
      this.updateId = $stateParams.id;
      this.getNote($stateParams.id);
    } else {
      this.newNote = this.resetNode();
    }
  }
  
  resetNode = (data) => {
    return {
      title: '',
      description: '',
      place: '',
      people: '',
      time: new Date()
    };
  }
  fillNode = (data) => {
    if(!data) {
      return this.resetNode();
    }

    return {
      title: data.title,
      description: data.description,
      place: data.place?data.place:'',
      people:data.people?data.people:'',
      time: new Date(data.time)
    };
  }

  saveNote = () => {
    this.submitInProgress = true;
    if(this.update) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }
  createNote = () => {
    this.$http.post('/api/notes', this.newNote).then(response => {
      this.goHomepage();
    });
  };
  getNote = (id) => {
    this.$http.get('/api/notes/' + id).then(response => {
      this.newNote = this.fillNode(response.data);
    });
  };
  updateNote = () => {
    this.$http.put('/api/notes/' + this.updateId, this.newNote).then(response => {
      this.goHomepage();
    });
  };
  goHomepage = () => {
    this.state.go("main");
  }
}

angular.module('ranaAppApp')
  .controller('ComposeController', ComposeController);

})();
