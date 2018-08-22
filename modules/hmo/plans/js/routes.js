/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.plans',{
            url: "/plans",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/plans/js/service.js',
                            'modules/hmo/plans/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.plans.planList', {
            url: "/",
            templateUrl: "modules/hmo/plans/views/list.html",
            //controller: "HmoPlanListCtrl",
            data: {pageTitle: 'PA'},

        })

        //create new / edit provider view
        .state('hmo.plans.planCreate', {
            url: "/create",
            templateUrl: "modules/hmo/plans/views/create.html",
            //controller: "HmoPlanCreateCtrl",
            data: {pageTitle: 'New Plan'},

        })



        //single Plan view
        .state('hmo.plans.planView', {
            url: "/view/:id",
            templateUrl: "modules/hmo/plans/views/view.html",
           // controller: "HmoPlanViewCtrl",
            data: {pageTitle: 'Plan Detail'},
        })


    
});
