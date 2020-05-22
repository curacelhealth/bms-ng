/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.policies',{
            url: "/policies",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/policies/js/service.js',
                            'modules/hmo/policies/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.policies.policyList', {
            url: "/",
            templateUrl: "modules/hmo/policies/views/list.html",
            //controller: "HmoPolicyListCtrl",
            data: {pageTitle: 'Policies'},

        })

        //create new / edit provider view
        .state('hmo.policies.policyCreate', {
            url: "/create",
            templateUrl: "modules/hmo/policies/views/create.html",
            //controller: "HmoPolicyCreateCtrl",
            data: {pageTitle: 'New Policy'},

        })



        //single Policy view
        .state('hmo.policies.policyView', {
            url: "/view/:id",
            templateUrl: "modules/hmo/policies/views/view.html",
           // controller: "HmoPolicyViewCtrl",
            data: {pageTitle: 'Policy Detail'},
        })


    
});
