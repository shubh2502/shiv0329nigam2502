app.service('LoginService',function($http){

this.login = function(emailId,passwordKey) {
   return $http.post('http://localhost:3000/account/login', {email: emailId, password: passwordKey});
};

var fb = {};
this.setFb = function(fbobject){
    fb = fbobject;
}

this.getFb = function(){
    return fb;
}
});


app.factory('loginCredentials',function(){

    return {
        "getFb" : this.getFbObject,
        "setFb" : this.setFbObject 
    }

   
});