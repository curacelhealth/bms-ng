/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.sms',{
            url: "/sms",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/sms/js/service.js',
                            'modules/hmo/sms/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.sms.smsList', {
            url: "/",
            templateUrl: "modules/hmo/sms/views/list.html",
            //controller: "HmoSmsListCtrl",
            data: {pageTitle: 'SMS'},

        })

        //create new / edit sms view
        .state('hmo.sms.serviceCreate', {
            url: "/create",
            templateUrl: "modules/hmo/sms/views/create.html",
            //controller: "HmoSmsCreateCtrl",
            data: {pageTitle: 'New SMS'},

        })

    
});
