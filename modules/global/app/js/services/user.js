/**
 * Created by JFlash on 12/14/17.
 */
BmsApp
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
                if(userData==null){
                    userData = jwtHelper.decodeToken(this.loadToken());

                }
                if(userData.exp>=(Date.now()+60)) this.logout();
                return userData;
            },

            logout : function(){
                localStorage.setItem(token_name,'');
                localStorage.clear();
                userData = null;
                $state.go("login");
            }


        };
});