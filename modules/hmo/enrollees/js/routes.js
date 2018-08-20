/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    //enrollees parent state
        .state('hmo.enrollees',{
            url: "/enrollees",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/enrollees/js/service.js',
                            'modules/hmo/enrollees/js/controllers.js',

                            'modules/hmo/companies/js/service.js',
                            'modules/hmo/providers/js/service.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.enrollees.enrolleeList', {
            url: "/",
            templateUrl: "modules/hmo/enrollees/views/list.html",
            controller: "HmoEnrolleeListCtrl",
            data: {pageTitle: 'Enrollees'},

        })

        //create new
        .state('hmo.enrollees.enrolleeCreate', {
            url: "/create",
            templateUrl: "modules/hmo/enrollees/views/create.html",
            controller: "HmoEnrolleeCreateCtrl",
            data: {pageTitle: 'New Enrollee'},

        })

        //enrollee detail
        .state('hmo.enrollees.enrolleeDetail', {
            url: "/view/:id",
            templateUrl: "modules/hmo/enrollees/views/view.html",
            controller: "HmoEnrolleeDetailCtrl",
            data: {pageTitle: 'Enrollee Detail'},
        })

    
});
