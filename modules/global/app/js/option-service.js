/**
 * Created by JFlash on 12/14/17.
 */
BmsApp
    .service('OptionService', function (API_HOST , $http) {
        return {
            getStates:function(){
                return $http.get(API_HOST+'/states/');
            },
           
        };
});