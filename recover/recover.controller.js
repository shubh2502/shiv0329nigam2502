/**=========================================================
 * Module: forget-password.js
 * Demo for reset password api
 =========================================================*/
app.controller('recoverController', RecoverFormController);
RecoverFormController.$inject = ['$http', '$state', 'RecoverService', '$rootScope', 'Notify', '$stateParams'];
function RecoverFormController($http, $state, RecoverService, $rootScope, Notify, $stateParams) {
  'use strict';
  var vm = this;

  activate();

  ////////////////

  function activate() {
    // bind here all data from the form
    vm.account = {};
    // place the message if something goes wrong
    vm.authMsg = '';
    console.log($stateParams);
    vm.reset = function (recoverForm) {
      vm.authMsg = '';
      console.log('formObject', recoverForm);
      if (vm.retypePassword !== vm.password) {
        recoverForm.account_password2.$dirty = true;
        return;
      }

      if (recoverForm.$valid) {
        // vm.loginId = $rootScope.login ? $rootScope.login.id : 2;
        RecoverService.resetPassword($stateParams.email, 'password', vm.password).then(function (response) {
          // assumes if ok, response is an object with some data, if not, a string with error
          // customize according to your api
          if (!response.status === 200) {
            vm.authMsg = "Failed in resetting your password :(.Please try again.";
          } else {
            if (response.data.data.email) {
              vm.notifyMsg = "Password set successfully !! :)";
              vm.notifyOpts = {
                pos: "top-right",
                status: "success"
              };
              Notify.alert(vm.notifyMsg, vm.notifyOpts);
              $state.go('signin');
            } else {
              vm.notifyMsg = response.data.login;
              vm.authMsg = response.data.login;
              vm.notifyOpts = {
                pos: "top-right",
                status: "danger"
              };
              Notify.alert(vm.notifyMsg, vm.notifyOpts);
              $state.go('signin');
            }
          }
        }, function () {
          vm.authMsg = FORGOT.ERROR - MESSAGE - SERVER - ERROR;
        });
      }
      else {
        // set as dirty if the user click directly to login so we show the validation messages
        /*jshint -W106*/
        //    vm.recoverForm.account_email.$dirty = true;
        recoverForm.account_password1.$dirty = true;
        recoverForm.account_password2.$dirty = true;
      }
    };

    //    vm.forget = function() {

    //    }

    vm.changePasswordType = function (type) {
      document.getElementById('exampleInputPassword1').type = type;
    }
  }
}