/**
 * Created by JFlash on 12/14/17.
 */
angular.module('BmsApp')
    .service('ProviderService', function ( $http, API_HOST,$httpParamSerializer) {

        return {
            fetchList: function (search) {
                let rs = $httpParamSerializer({search:search})
                return $http.get(API_HOST+'/providers/?'+rs);
            },

            //return api url for handling datatable requests ..i.e DT
            fetchListDTUrl:function () {
                return   API_HOST+'/providers/DT';
            },

            fetchSingleByID: function (id) {
                return $http.get(API_HOST+'/providers/'+id);
                
            },

            createNewProvider: function (obj) {
                return $http.post(API_HOST+'/providers/create', obj);
                
            },

            getProviderStatus: function (){
                return $http.get(API_HOST+'/provider-statuses/');
            },

            getProviderTier: function (){
                return $http.get(API_HOST+'/provider-tiers/');
            },

            editSingleProvider: function (id, obj) {
                return $http.post(API_HOST+'/providers/'+id+'/update', obj);
            }

        };
});