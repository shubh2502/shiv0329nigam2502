app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {
  // 
  // For any unmatched url, redirect to /state1 
  $urlRouterProvider.otherwise("/login");
  // 
  // Now set up the states 
  $stateProvider
    .state('signup', {
      url: "/register",
      templateUrl: "signup/signup.html",
    })
    // .state('state1.list', {
    //   url: "/list",
    //   templateUrl: "partials/state1.list.html",
    //   controller: function($scope) {
    //     $scope.items = ["A", "List", "Of", "Items"];
    //   }
    // })
    .state('signin', {
      url: "/login",
      templateUrl: "login/login.html"
    })
    .state('recover', {
      url: '/recover/:email',
      templateUrl: 'recover/recover.html',
      params: {new_param: null}
    })
    .state('home', {
      url: '/home',
      templateUrl: 'home/home.html'
    })
  // .state('state2.list', {
  //   url: "/list",
  //   templateUrl: "partials/state2.list.html",
  //   controller: function($scope) {
  //     $scope.things = ["A", "Set", "Of", "Things"];
  //   }
  // });
  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // translate provider 

  // $translateProvider.fallbackLanguage('en');
  // $translateProvider.registerAvailableLanguageKeys(['en', 'es'],{
  //   'en_*':'en',
  //   'es_*':'es'
  // })
  // // $translateProvider.preferredLanguage('en');
  // $translateProvider.useSanitizeValueStrategy('escape');
  // $translateProvider.determinePreferredLanguage(function () {
  // // define a function to determine the language
  // // and return a language key
  // });
  // $translateProvider.useLocalStorage();
  $translateProvider.preferredLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'ar'], {
    'en-*': 'en',
    'ar-*': 'ar'
  });

  // 
  $translateProvider.useStaticFilesLoader({
    files: [{
      prefix: 'data/locale-',
      suffix: '.json'
    }]
  });
  $translateProvider.useLoaderCache(true);
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useSanitizeValueStrategy(null);
  // tmhDynamicLocaleProvider.defaultLocale('en');
  // tmhDynamicLocaleProvider.useStorage('$cookieStore');
  // tmhDynamicLocaleProvider.defaultLocale(locale);
  // tmhDynamicLocaleProvider.useCookieStorage();
  // tmhDynamicLocaleProvider.localeLocationPattern('angular-i18n/angular-locale_{{locale}}.js');
});


app.run(['$rootScope', function($rootScope){
  $rootScope.$on('$translateChangeSuccess', function(){
      console.log('Selected language applied');
  });
  
  $rootScope.$on('$translateChangeError', function(){
      alert('Error, selected language was not applied');
  });
}]);