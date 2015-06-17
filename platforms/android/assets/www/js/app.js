// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'highcharts-ng'])

.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
//    if (window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if (window.StatusBar) {
//      // org.apache.cordova.statusbar required
//      StatusBar.styleDefault();
//    }
//   
//  });
})

.config(function($stateProvider,$ionicConfigProvider, $urlRouterProvider,$httpProvider) {
  $stateProvider
  .state('load', {
      url: "/load",
       templateUrl: "templates/load.html",
      controller: 'load'
    })
  .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })
  .state('logout', {
      url: "/logout",
      controller: 'LogoutCtrl'
    })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('app.playerprofile', {
    url: "/playerprofile",
    views: {
      'menuContent': {
        templateUrl: "templates/playerprofile.html",
        controller: 'PlayerProfileCtrl'
      }
    }
  })

  .state('app.existingGameList', {
      url: "/existingGameList",
      views: {
        'menuContent': {
          templateUrl: "templates/existingGameList.html",
          controller: 'existingGameListCtrl'
        }
      }
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.sportsList', {
      url: "/sportsList",
      views: {
        'menuContent': {
          templateUrl: "templates/sportsList.html",
          controller: 'SportListCtrl'
        }
      }
    })
    .state('app.createGame', {
      url: "/createGame",
      views: {
        'menuContent': {
          templateUrl: "templates/createGame.html",
          controller: 'CreateGameCtrl'
        }
      }
    })
    .state('app.gamedetails', {
      url: "/gamedetails",
      views: {
        'menuContent': {
          templateUrl: "templates/gamedetails.html",
         controller: 'GameDetailsCtrl'
        }
      }
    })


    .state('first', {
      url: "/first",
      controller: 'FirstCtrl'
    })

//  .state('app.single', {
//    url: "/playlists/:playlistId",
//    views: {
//      'menuContent': {
//        templateUrl: "templates/playlist.html",
//        controller: 'PlaylistCtrl'
//      }
//    }
//  });
  // if none of the above states are matched, use this as the fallback
  
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $urlRouterProvider.otherwise('/first');
});
