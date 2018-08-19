/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.services',{
            url: "/services",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/services/js/service.js',
                            'modules/hmo/services/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.services.serviceList', {
            url: "/",
            templateUrl: "modules/hmo/services/views/list.html",
            controller: "HmoServiceListCtrl",
            data: {pageTitle: 'PA'},

        })

        //create new / edit provider view
        .state('hmo.services.serviceCreate', {
            url: "/create",
            templateUrl: "modules/hmo/services/views/create.html",
            controller: "HmoServiceCreateCtrl",
            data: {pageTitle: 'New Service'},

        })

    
});
