/**
 * Created by JFlash on 12/14/17.
 */
angular.module('BmsApp')
    .service('UserService', function (API_HOST_AUTH , $http,jwtHelper,$state) {
        
        var token_name = "curacel_auth_token";
        var userData = null;

        return {
            login : function(data){
                return $http.post(API_HOST_AUTH+'/login',data);
            },
            saveToken : function (token) {
                localStorage.setItem(token_name,token);
            },

            loadToken: function () {
                return localStorage.getItem(token_name);

            },
            getUserData : function(){
                if(userData==null) {
                    let token = this.loadToken()
                    userData = jwtHelper.decodeToken(token);

                }
                return userData;
            },

            logout : function(){
                localStorage.setItem(token_name,'');
                localStorage.clear();
                userData = null;
                $state.go("login");
            },

            checkToken:function () {
                return $http.get(API_HOST_AUTH);
            }


        };
});