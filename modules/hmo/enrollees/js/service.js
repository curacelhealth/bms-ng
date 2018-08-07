/**
 * Created by JFlash on 12/14/17.
 */
BmsApp
    .service('EnrolleeService', function ( $http,API_HOST,$httpParamSerializer) {

        return {
            fetchList: function (search,limit, type_to_show) {
                type_to_show = type_to_show || ''
                var data = {search:search || '', limit:limit || 10}
                if(type_to_show=='P') data.principals_only= true
                else if(type_to_show=='D') data.dependants_only = true

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
                
            },

            fetchPlans: function () {
                return $http.get(API_HOST+'/enrollee-plans/')
            },
            fetchStatuses: function () {
                return $http.get(API_HOST+'/enrollee-statuses/')
            }


        };
});