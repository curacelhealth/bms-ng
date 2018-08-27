/**
 * Created by JFlash on 12/14/17.
 */
angular.module('BmsApp')
    .service('CompaniesService', function ( $http,API_HOST,$httpParamSerializer) {

        return {
            fetchList: function (search,limit) {
                var qs = $httpParamSerializer({search:search||'', limit:limit||5})
                return $http.get(API_HOST+'/companies/?'+qs);
            },

 		//return api url for handling datatable requests ..i.e DT
            fetchListDTUrl:function () {
                return   API_HOST+'/companies/DT'
            },    

            fetchSingleByID: function (id) {
               return $http.get(API_HOST+'/companies/'+id) 
            }, 

            createNewCompany: function (obj) {
                return $http.post(API_HOST+'/companies/create', obj);
            },

            fetchAllStatus: function() {
                return $http.get(API_HOST + '/company-statuses/') 
            }


        };
});