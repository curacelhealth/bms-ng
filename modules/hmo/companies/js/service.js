/**
 * Created by JFlash on 12/14/17.
 */
BmsApp
    .service('CompanyService', function ( $http,API_HOST,$httpParamSerializer) {

        return {
            fetchList: function (search,limit) {
                var qs = $httpParamSerializer({search:search||'', limit:limit||5})
                return $http.get(API_HOST+'/companies/?'+qs);
            },
            
            fetchSingleByID: function (id) {
                
            }


        };
});