
angular.module('Cards', ['ionic'])

.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
  url: 'https://ionic-songhop.herokuapp.com'
})
.controller('MainCtrl', function(){

});
