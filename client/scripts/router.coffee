config = ($locationProvider, $stateProvider, $urlRouterProvider) =>
  $locationProvider.html5Mode(true)
  $stateProvider
    .state 'tab',
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      resolve:
        user: => Meteor.user()
        chats: => Meteor.subscribe('chats')

    .state 'tab.chats',
      url: '/chats',
      views:
        'tab-chats':
          templateUrl: 'client/templates/chats.html'
          controller: 'ChatsCtrl as chats'

    .state 'tab.chat',
      url: '/chats/:chatId'
      views:
        'tab-chats':
          templateUrl: 'client/templates/chat.html'
          controller: 'ChatCtrl as chat'

    .state 'login',
      url: '/login'
      templateUrl: 'client/templates/login.html'
      controller: 'AuthenticationCtrl'

    .state 'register',
      url: '/register'
      templateUrl: 'client/templates/register.html'
      controller: 'AuthenticationCtrl'

    .state 'confirmation',
      url: '/confirmation/:phone'
      templateUrl: 'client/templates/confirmation.html'
      controller: 'ConfirmationCtrl as confirmation'

    .state 'profile',
      url: '/profile'
      templateUrl: 'client/templates/profile.html'
      controller: 'ProfileCtrl as profile'
      resolve: user: => Meteor.user()

    .state 'tab.settings',
      url: '/settings'
      views:
        'tab-settings':
          templateUrl: 'client/templates/settings.html'
          controller: 'SettingsCtrl as settings'
 
  $urlRouterProvider.otherwise('tab/chats')

angular
  .module('Whatsapp')
  .config(config)
  .run ($rootScope, $urlRouter, $state)=>
    $rootScope.$on '$locationChangeSuccess', (e, newUrl, oldUrl)=>
      currentPath = _.last(newUrl.split("/"))
      if Meteor.userId() or currentPath is "register"
        return

      $state.go('login')
