'use strict';

(function() {

class MainController {
  constructor($http, $scope) {
    this.$http = $http;
    this.currentNoteIndex = 0;
    this.currentNote = {};
    this.showNew = false;
    this.notes = [];
    this.loadData();
  }
  loadData = () => {
    this.$http.get('/api/notes').then(response => {
      this.notes = response.data;
      this.setCurrentNote(0);
    });
  };
  setCurrentNote = (cursor) => {
    this.currentNoteIndex  = (this.currentNoteIndex + cursor) % this.notes.length; 
    this.currentNote = this.notes[this.currentNoteIndex];
  }

  nextNote = () => {
    this.setCurrentNote(1);
  };
  previousNote = () => {
    this.setCurrentNote(-1 + this.notes.length);
  };

  addNote = () => {
    console.log(this.newNote);
  }

  showNewNoteForm = () => {
    this.showNew
  }

  createNote = () => {
    const note = {
        title: 'First Ttitle',
        description: 'First description',
    }
    this.$http.post('/api/notes', note).then(response => {
      console.log(response);
    });
  };
}

angular.module('ranaAppApp')
  .controller('MainController', MainController);

})();
