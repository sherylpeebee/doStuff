angular.module('starter.controllers', [])

.controller('CardCtrl', function($scope, ezfb, $window, $location) {

  $scope.cards = [
              {name: 'clubs', symbol: '♣'},
              {name: 'diamonds', symbol: '♦'},
              {name: 'hearts', symbol: '♥'},
              {name: 'spades', symbol: '♠'}
          ];

          $scope.throwoutleft = function (eventName, eventObject, index) {
              console.log('throwoutleft', eventObject, index);
              $scope.cards.splice(index, 1);
          };

          $scope.throwoutright = function (eventName, eventObject, index) {
              console.log('throwoutright', eventObject, index);
              $scope.cards.splice(index, 1);
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
