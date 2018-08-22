/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.paCodes',{
            url: "/pa_codes",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/pa_codes/js/service.js',
                            'modules/hmo/pa_codes/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.paCodes.paCodeList', {
            url: "/",
            templateUrl: "modules/hmo/pa_codes/views/list.html",
            //controller: "HmoPaCodeListCtrl",
            data: {pageTitle: 'PA'},

        })

        //create new / edit provider view
        .state('hmo.paCodes.paCodeCreate', {
            url: "/create",
            templateUrl: "modules/hmo/pa_codes/views/create.html",
            //controller: "HmoPaCodeCreateCtrl",
            data: {pageTitle: 'New PaCode'},

        })

    
});
