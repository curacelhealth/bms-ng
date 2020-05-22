/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.benefits',{
            url: "/benefits",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/benefits/js/service.js',
                            'modules/hmo/benefits/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.benefits.benefitList', {
            url: "/",
            templateUrl: "modules/hmo/benefits/views/list.html",
            //controller: "HmoBenefitListCtrl",
            data: {pageTitle: 'PA'},

        })

        //create new / edit provider view
        .state('hmo.benefits.benefitCreate', {
            url: "/create",
            templateUrl: "modules/hmo/benefits/views/create.html",
            //controller: "HmoBenefitCreateCtrl",
            data: {pageTitle: 'New Benefit'},

        })



                  //Single Benefits view
        .state('hmo.benefits.benefitView', {
            url: "/view/:id",
            templateUrl: "modules/hmo/benefits/views/view.html",
           // controller: "HmoBenefitViewCtrl",
            data: {pageTitle: 'Benefit Detail'},
        })


    
});
