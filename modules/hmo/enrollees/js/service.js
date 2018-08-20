/**
 * Created by JFlash on 12/14/17.
 */
angular.module('BmsApp')
    .service('EnrolleeService', function ( $http,API_HOST,$httpParamSerializer) {

        var sexes = {'M':'Male','F':'Female'}
        return {
            fetchList: function (search,limit, type_to_show) {
                type_to_show = type_to_show || ''
                var data = {search:search || '', limit:limit || 10}
                if(type_to_show==='P') data.principals_only= true
                else if(type_to_show==='D') data.dependants_only = true

                var qs = $httpParamSerializer(data)
                return $http.get(API_HOST+'/enrollees/?'+qs)
            },
            
            fetchListDTUrl:function () {
              return   API_HOST+'/enrollees/DT'
            },
            
            createNew: function (enrollee) {
                return $http.post(API_HOST+'/enrollees/create',{enrollee:enrollee})
            },
            update: function (id,enrollee) {
                return $http.post(API_HOST+'/enrollees/'+id+'/update',{enrollee:enrollee})
            },
            
            fetchSingleByID: function (id) {
                return $http.get(API_HOST+'/enrollees/'+id)
            },

            fetchPlans: function () {
                return $http.get(API_HOST+'/plans/')
            },
            fetchStatuses: function () {
                return $http.get(API_HOST+'/enrollee-statuses/')
            }
            ,getSex: function (code) {
                return sexes[code]
            }



        };
});