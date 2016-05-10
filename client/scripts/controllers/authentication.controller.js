angular
  .module('Whatsapp')
  .controller('AuthenticationCtrl', AuthenticationCtrl);
 
function AuthenticationCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
 
  // Login function
  $scope.login = function() {
    if (_.isEmpty(this.email) && _.isEmpty(this.password) ) return;

    $ionicLoading.show({ template: 'Signing in ...' });
    Meteor.loginWithPassword(this.email, this.password, (err) => {
      $ionicLoading.hide();

      if (err) { return handleError(err); }

      $state.go('tab.chats');
    });
  }

  // Registration function
  $scope.register = function() {
    if (_.isEmpty(this.email) && _.isEmpty(this.password) ) return;

    let options = {email: this.email, password: this.password};

    Accounts.createUser(options, (err) => {
      if (err) { return handleError(err); }
      $state.go('login');
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
