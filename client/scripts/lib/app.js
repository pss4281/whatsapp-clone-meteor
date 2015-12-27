angular
  .module('Whatsapp', [
    'angular-meteor',
    'ionic',
    'angularMoment'
  ])
  .config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
  }]);
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['Whatsapp']);
}
