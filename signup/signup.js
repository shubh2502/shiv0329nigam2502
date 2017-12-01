/**=========================================================
 * Module: access-register.js
 * Demo for register api
 =========================================================*/
 app.controller('signupCntrl', registerController);
 registerController.$inject = [ 'SignupService','$location','Notify','$rootScope','$state'];
function registerController(SignupService, $location, Notify,$rootScope,$state) {
    var vm = this;
    vm.passwordshow = false;
    vm.user = {};
    vm.address = {};
    vm.addressType = 'Current';
    vm.user.current = {};
    vm.user.permanent = {};
    vm.user.company = {};
    vm.user.buyer = true;
    vm.user.seller = false;
    // vm.successMessage = 'Yeay ,you registered successfully :) !!';
    vm.notifyMsg = "";
    vm.notifyOpts = {};
    vm.getCountries = () => {
        SignupService.getCountries().then((result) => {
            console.log('result', result);
            if (result.status === 200) {
                vm.address.countries = result.data[0];
                let typ = vm.addressType;
                if(vm.addressType === 'Current')
                vm.user.current.country = result.data[0][0];
                else if(vm.addressType === 'Company')
                vm.user.company.country = result.data[0][0];
            }
        });
    }

    vm.getCities = (tempid) => {
        let id = tempid || 1;
        SignupService.getCities(id).then((result) => {
            console.log('result', result);
            if (result.status === 200) {
                vm.address.cities = result.data[0];
                let typ = vm.addressType;
                if (vm.addressType === 'Current')
                    vm.user.current.city = result.data[0][0];
                else if (vm.addressType === 'Company')
                    vm.user.company.city = result.data[0][0];
            }
        });
    }

    vm.getStates = (tempid) => {
        let id = tempid || 1;
        SignupService.getStates(id).then((result) => {
            console.log('result', result);
            if (result.status === 200) {
                vm.address.states = result.data[0];
                if (vm.addressType === 'Current') {
                    vm.user.current.state = result.data[0][0];
                    vm.getCities(vm.user.current.state.id);
                }else if (vm.addressType === 'Company') {
                    vm.user.company.state = result.data[0][0];
                    vm.getCities(vm.user.company.state.id);
                }
            }
        });
    }
    vm.getCountries();
    vm.getStates();
    // toggle password change 
    vm.changePasswordType = function (type) {
        document.getElementById('password').type = type;
    }

    //   toggle address
    vm.addresscheck = function (event, type,address) {
        $('#uladdress .active').removeClass('active');
        event.currentTarget.className = 'active';
        vm.addressType = type;
        if(vm.addressType === 'Current'){
            vm.user.current = address;
            // vm.$digest();
        }else {
            vm.user.company = address;
        }
        
        if((!vm.user.company.state || !vm.user.company.city || !vm.user.company.country) || (!vm.user.current.state || !vm.user.current.city || !vm.user.current.country)){
        vm.getCountries();
        vm.getStates();
      }
    }


    // save address according to type
    vm.saveAddress = (address) => {
    }

    //password strength 
    var result = $("#password-strength");

    document.getElementById('password').addEventListener('keyup', function () {
        $(".bar-text").html(checkStrength($('#password').val()))
    })

    function checkStrength(password) {

        //initial strength
        var strength = 0

        if (password.length == 0) {
            result.removeClass()
            return ''
        }
        //if the password length is less than 7, return message.
        if (password.length < 9) {
            result.removeClass()
            result.addClass('normal')
            return 'Normal'
        }

        //length is ok, lets continue.

        //if length is 8 characters or more, increase strength value
        if (password.length > 9) strength += 1

        //if password contains both lower and uppercase characters, increase strength value
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1

        //if it has one special character, increase strength value
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1

        //if it has two special characters, increase strength value
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) strength += 1

        //now we have calculated strength value, we can return messages

        //if value is less than 2
        if (strength < 2) {
            result.removeClass()
            result.addClass('medium')
            return 'Medium'
        } else if (strength == 2) {
            result.removeClass()
            result.addClass('strong')
            return 'Strong'
        } else {
            result.removeClass()
            result.addClass('vstrong')
            return 'Very Strong'
        }
    }
    //  end of password strength


    vm.register = (user,userForm) => {
        if(userForm.$valid){
        let roleId = vm.user.buyer ? 1 : 2;
        let address = {}
        address = user.current.houseno ? user.current : user.company;
        let addressType = user.current.houseno ? 2 : 3;
        let reqObj = {
            "first": user.firstName || "null",
            "last": user.lastName || "null",
            "password": user.password || "null",
            "role": roleId || "null",
            "phoneNo": user.phone || "null",
            "emailId": user.email || "null",
            "alternateMobile": null,
            "alternateEmail": null,
            "city": user.current.city.id || null,
            "state": user.current.state.id || null,
            "country": user.current.country.id || null,
            "street": user.current.street || "null",
            "landmark": user.current.landmark || "null",
            "houseno": user.current.houseno || "null",
            "addressType": addressType,
            "loginType": 1,
            "companyName": user.companyname || "null",
            "companyDesignation": user.designation || "null",
            "companyEmail":user.companyemail || "null"
        }
        reqObj["company_city"] = user.company.city? user.company.city.id : 0;
        reqObj["company_state"] = user.company.state ? user.company.state.id : 0;
        reqObj["company_country"] = user.company.country ? user.company.country.id : 0;
        reqObj.company_street = user.company.street || "null";
        reqObj.company_landmark = user.company.landmark || "null";
        reqObj.company_houseno = user.company.houseno || "null";

        SignupService.register(reqObj).then((response) => {
            console.log(response);
            if(response.status === 200){

                if(!response.data.data.UserId && !response.data.data.PhoneNo){
                vm.notifyMsg = "Registered successfully !! :)";
                vm.notifyOpts = {
                    pos: "top-right",
                    status: "success"
                };
                Notify.alert(vm.notifyMsg,  vm.notifyOpts);
                $rootScope.login = response.data.data;
                vm.routeTo();
                } else if(response.data.data.UserId || response.data.data.PhoneNo){
                    vm.notifyMsg = (()=>{
                                    if(response.data.data.UserId && !response.data.data.PhoneNo)
                                    return "Your email id "+ response.data.data.UserId+" is already registered.";
                                    else if(response.data.data.PhoneNo && !response.data.data.UserId)
                                    return "This "+ response.data.data.PhoneNo + " Phone no is already registered in our system.Please try again with new number.";
                                    else if(response.data.data.Phone && response.data.data.UserId)
                                    return "Email and Phone number are already registered.Please try with new id and number.";
                    })();
                    vm.notifyOpts = {
                        pos: "top-right",
                        status: "danger"
                    };
                    Notify.alert(vm.notifyMsg,  vm.notifyOpts);
                    $state.go('signup');                                
                }
            }
        }, (response) => {
            console.log(response);
            vm.user.authMsg = 'Server Request Error';
        });
      }
      else {
        vm.notifyMsg = "Opps !!:( Please check your input field's value and try again.";
        vm.notifyOpts = {
            pos: "top-right",
            status: "danger"
        };
        vm.user.authMsg =  vm.notifyMsg;
        // Notify.alert(vm.notifyMsg, vm.notifyOpts);
      }
   }

    vm.changeCountry = (obj) => {
        console.log('country:', obj.name);
        vm.getStates(obj.id);
    }

    vm.changeCity = (obj) => {
        console.log('city:', obj.name);
    }

    vm.changeState = (obj) => {
        console.log('state:', obj.name);
        vm.getCities(obj.id);
    }

    vm.routeTo = () => {
       $state.go('home');
    }

    vm.toogle = (value,type) => {
        vm.user.buyer = type === 'buyer' ? value : !value;
        vm.user.seller = type === 'seller' ? value : !value;
    }


};


