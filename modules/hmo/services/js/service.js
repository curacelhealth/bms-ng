/**
 * Created by JFlash on 12/14/17.
 */
angular.module('BmsApp')
    .service('ServicesService', function ( $http,API_HOST,$httpParamSerializer) {

        return {
            fetchServiceTypes: function (id) {
                return $http.get(API_HOST + '/services/types')
            }, 

            fetchListDTUrl: function () {
                return API_HOST + '/services/DT'
            },    

            createService: function (obj) {
                return $http.post(API_HOST + '/services/create', obj);
            },

            deleteService: function (id) {
                return $http.delete(API_HOST + '/services/' + id)
            },
        }

});