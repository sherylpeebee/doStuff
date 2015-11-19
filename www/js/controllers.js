angular.module('starter.controllers', [])
.controller('CardCtrl', function($scope, ezfb, $window, $location, StuffToDo) {
// StuffToDo.test();

StuffToDo.search()
.then(function(res){
  console.log(res);
})


// var allLi = document.getElementsByTagName('li');
//   ionic.off('click', function(){
//
//   }, allLi);
/**
//make a service to contain all of the right swipes
//e.g.
angular.module('starter.services')
.service('StuffToDo', function($q){
  var favorites = [];
  this.addToFavorites = function(thingToDo){
    favorites.push(thingToDo)
  }

  this.returnFavorites = function(){
    return favorites;
  }

});
**/
    // $('.card').off('click');

    // $('.card').css('pointerEvents', 'none')



  $scope.stabilize = function(e){
    console.log(e);
    e.preventDefault();
    var elementToDisable = e.target;
    elementToDisable.removeEventListener('click', e, false);
    // debugger;

  };

  $scope.throwoutleft = function (eventName, eventObject) {
      console.log('throwoutleft', eventObject);
      var objectToDestroy = eventObject.target;
      angular.element(objectToDestroy).remove();

  };

  $scope.throwoutright = function (eventName, eventObject) {
      console.log('throwoutright', eventObject);
      var objectToDestroy = eventObject.target;
      angular.element(objectToDestroy).remove();
  };

  $scope.login = function () {
    FB.login(function (res) {
      console.log(res);
      if (res.authResponse) {
        console.log(res.authResponse);
        var userId = res.authResponse.userID;
        console.log(userId);
        ezfb.api("/" + userId + "/friends", function(response){
          if (response && !response.error) {
            console.log(response);
            var friendsInApp = response.data;
          }
        });
      }
    }, {scope: 'email,user_friends'});
  };

  $scope.logout = function(){
    ezfb.getLoginStatus(function(response){
      console.log(response);
      if (response.status === 'connected') {
        ezfb.logout(function(res){
          console.log(res);
        });
      }
    });
    // ezfb.logout(function(response) {
    //   // user is now logged out
    // });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
