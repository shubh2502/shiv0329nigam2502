app.service('SignupService',function($http){
    var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    // $http.post(url,data,config);
    this.getCountries = function(){
      return  $http.get('http://localhost:3000/address/country');
    }

    this.getCities = function(id){
        return  $http.get('http://localhost:3000/address/cities?stateId='+id);
    }

    this.getStates = function(id){
        return  $http.get('http://localhost:3000/address/states?countryId='+id);
    }

    this.register = function(obj){
        console.log('ser',obj);
        return $http.post('http://localhost:3000/account/register',obj);
    }
});