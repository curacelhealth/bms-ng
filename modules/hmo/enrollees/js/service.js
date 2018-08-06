/**
 * Created by JFlash on 12/14/17.
 */
BmsApp
    .service('EnrolleeService', function ( $http,API_HOST,$httpParamSerializer) {

        return {
            fetchList: function (search,limit) {
                var data = {search:search || '', limit:limit || 10}
                var qs = $httpParamSerializer(data)
                return $http.get(API_HOST+'/enrollees/?'+qs)
            },
            
            fetchListDTUrl:function () {
              return   API_HOST+'/enrollees/DT'
            },
            
            createNew: function (data) {
                return $http.post(API_HOST+'/enrollees/create',data)
            },
            
            fetchSingleByID: function (id) {
                
            }


        };
});