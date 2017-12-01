app.controller('homeController', homeController);

homeController.$inject = ['$state', '$scope', '$cookies', 'LoginService', '$rootScope'];
function homeController($state, $scope, $cookies, LoginService, $rootScope) {
  var vm = this;

  activate();


  function activate() {
    document.getElementById('slide-show').style.display = "none";
    vm.login = {};
    if($rootScope.login){
    vm.login.userName = $rootScope.login.first_name +" "+ $rootScope.login.last_name;
    }if($rootScope.fbLogin) {
      vm.login.userName = $rootScope.fbLogin.Name; 
    }if ($rootScope.googleLogin){
      vm.login.userName = $rootScope.googleLogin.displayName;
    }
    
    vm.logout = function () {
      if ($rootScope.fbLogin) {
        let FB = window.FB;
        FB.logout(function (response) {
          $cookies.remove("user-fb-accessToken");
          $cookies.remove("user-fb-expiresIn");
          $state.go('signin');
          document.getElementById('slide-show').style.display = "block";
        });
      } else if ($rootScope.googleLogin) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          alert('User signed out.');
          $state.go('signin');
          document.getElementById('slide-show').style.display = "block";
        });
      } else {
        alert('logging out');
        $state.go('signin');
      }
    }
  }
}
