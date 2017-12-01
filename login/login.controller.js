'use strict';
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/
    app.controller('loginController', LoginFormController);
    LoginFormController.$inject = ['$http', '$state','LoginService','$cookies','loginCredentials','$rootScope'];
    function LoginFormController($http, $state,LoginService,$cookies,loginCredentials,$rootScope) {
        var vm = this;
        activate();

        function activate() {
          document.getElementById('slide-show').style.display = "block";
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';
            $rootScope.fbLogin = undefined;
            $rootScope.login = undefined;
            $rootScope.googleLogin = undefined;
            if(vm.loginForm.$valid) {
              LoginService.login(vm.account.email,vm.account.password).then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( response.status === 200 ) {
                    if(response.data.data.email)
                    {
                      vm.authMsg = 'Incorrect credentials.';                      
                    } else if(response.data.data.email === null) {
                      vm.authMsg = 'Unregistered email address.';
                    } else {
                      $rootScope.login = response.data.data;
                      $state.go('home');
                    }
                  }
                  else if(response.status === 500) {
                    vm.authMsg = 'Server error';
                  }
                  setTimeout(() => {
                    vm.authMsg = "";
                  },10);
                }, function() {
                  vm.authMsg = 'Server error';
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };

          vm.moveToForgetPassword = function(emailFlag){
              if(emailFlag){
                vm.forgetClick = true;
              }else {
                vm.forgetClick = false;
                $state.go('recover',{'email':vm.account.email});
              }
          }

           vm.statusChangeCallback = function (response,FB){
                    if(response.status === 'connected'){
                        console.log('authenticated',response);
                        $cookies.put('user-fb-accessToken',response.authResponse.accessToken); 
                        $cookies.put('user-fb-expiresIn',response.authResponse.expiresIn);
                        $cookies.put('user-fb-signedRequest',response.authResponse.signedRequest);                                                                  
                        testAPI();
                    } else {
                      console.log('not authenticated',response);
                      FB.login(function (response) {
                          vm.statusChangeCallback(response);
                      });
                    }
                }
      
          vm.checkLoginState = function() {
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '378187655973354',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.11'
              });
                
              // FB.AppEvents.logPageView();   
              FB.getLoginStatus(function(response) {
                console.log('get login response',response);
                vm.statusChangeCallback(response,FB);
              });
                
            };
          
            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
            }

            function testAPI(){
              FB.api('/me?fields=id,name,email,picture', function(response){
                if(response && !response.error){
                  $cookies.put('user-fb-email',response.email);
                  $cookies.put('user-fb-name',response.name);
                  $cookies.put('user-fb-picture',response.picture.data.url);
                  console.log('usercookie',$cookies.get('user-fb-email'),$cookies.get('user-fb-name'),$cookies.get('user-fb-pictures'),$cookies.get('user-fb-accessToken'),$cookies.get('user-fb-expiresIn'));
                  // buildProfile(response);
                  console.log('fb response',response);
                  $rootScope.fbLogin = {
                      Email : response.email,
                      Name : response.name,
                      PicUrl : response.picture.data.url
                  } 
                  $state.go('home');
                }
              })
            }

            vm.onSignIn =  function(googleUser) {
              var profile = googleUser.getBasicProfile();
            }

            function handleClientLoad() {
              // Loads the client library and the auth2 library together for efficiency.
              // Loading the auth2 library is optional here since `gapi.client.init` function will load
              // it if not already loaded. Loading it upfront can save one network request.
              gapi.load('client:auth2', initClient);
            }
      
            function initClient() {
              // Initialize the client with API key and People API, and initialize OAuth with an
              // OAuth 2.0 client ID and scopes (space delimited string) to request access.
              gapi.client.init({
                  apiKey: 'AIzaSyD2fuQAfD6qcqohyNZ05xhMJnthORhD0e4',
                  discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                  clientId: '671562584556-ckb59d3hmb9qtn1a3gjnimlfc2skt3m5',
                  scope: 'profile email'
              }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      
                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
              });
            }
      
            function updateSigninStatus(isSignedIn) {
              // When signin status changes, this function is called.
              // If the signin status is changed to signedIn, we make an API call.
              if (isSignedIn) {
                makeApiCall();
              }
            }
      
            vm.handleSignInClick = function(event) {
              // Ideally the button should only show up after gapi.client.init finishes, so that this
              // handler won't be called before OAuth is initialized.
              handleClientLoad();            
              setTimeout(() => {
                gapi.auth2.getAuthInstance().signIn({'prompt' : 'select_account'});
              },100);
            }
      
            function makeApiCall() {
              // Make an API call to the People API, and print the user's given name.
              gapi.client.people.people.get({
                'resourceName': 'people/me',
                'requestMask.includeField': 'person.names'
              }).then(function(response) {
                $rootScope.googleLogin = response.result.names[0];
                $state.go('home');
              }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
              });
            }

        }
    }