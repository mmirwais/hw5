(function (window) {

  'use strict';

  var App = window.App || {};

  var $ = window.jQuery;



  function RemoteDataStore(database) {

      if (!database){

          throw new Error('No remote database supplied.');

      }



      this.db = database;

  }



  RemoteDataStore.prototype.add = function (key, val) {

      this.db.collection("coffeeorders").add(val)

      .then(function(docRef) {

          console.log("Document written with ID: ", docRef.id);

      }).catch(function(error) {

          console.error("Error adding document: ", error);

      });



  };



  RemoteDataStore.prototype.getAll = function() {

      this.db.collection('coffeeorders').get()

      .then((querySnapshot) => { querySnapshot.docs

          .forEach(doc => { console.log(doc.data());});});

  };



  RemoteDataStore.prototype.get = function(key){

      this.db.collection('coffeeorders').get()

      .then((querySnapshot) => { querySnapshot.docs

          .forEach(doc => { 

              var d = doc.data();

              if (d['emailAddress'] == key){

                  console.log(doc.data());  }   });

      });
  };



  RemoteDataStore.prototype.remove = function (key){

      this.db.collection('coffeeorders').get()

      .then((querySnapshot) => { querySnapshot.docs
          .forEach(doc => { 
 var d = doc.data();

 if (d['emailAddress'] == key){
  console.log(doc.data());

 this.db.collection('coffeeorders').doc(doc.id).delete().then(function(){
console.log("Document successfully deleted");

   }).catch(function(error){
    console.error("Error removing document: ", error);  }); }

          }); });};
 App.RemoteDataStore = RemoteDataStore;

  window.App = App;

})(window);