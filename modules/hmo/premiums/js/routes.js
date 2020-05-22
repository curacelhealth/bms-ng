/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.premiums',{
            url: "/premiums",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/premiums/js/service.js',
                            'modules/hmo/premiums/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.premiums.premiumList', {
            url: "/",
            templateUrl: "modules/hmo/premiums/views/list.html",
            //controller: "HmoPremiumListCtrl",
            data: {pageTitle: 'PA'},

        })

        //create new / edit provider view
        .state('hmo.premiums.premiumCreate', {
            url: "/create",
            templateUrl: "modules/hmo/premiums/views/create.html",
            //controller: "HmoPremiumCreateCtrl",
            data: {pageTitle: 'New Premium'},

        })

    
});
