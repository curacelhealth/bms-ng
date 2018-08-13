/**
 * Created by JFlash on 12/14/17.
 */
BmsApp
    .service('ProviderService', function ( $http,API_HOST) {

        return {
            fetchList: function () {
                return $http.get(API_HOST+'/providers/');
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
                
            }

        };
});