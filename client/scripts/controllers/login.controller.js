angular
  .module('Whatsapp')
  .controller('LoginCtrl', LoginCtrl);
 
function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
 
  $scope.login = function() {
    if (_.isEmpty(this.email) && _.isEmpty(this.password) ) return;
    user = Meteor.users.find({email: this.email});
    if(!user) return;
 
    $ionicLoading.show({ template: 'Signing in ...' });

    Meteor.loginWithPassword(user, this.password, (err) => {
      $ionicLoading.hide();

      if (err) {
        return handleError(err);
      }

      $state.go('chats');
    });
  }
 
  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
