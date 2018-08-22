/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

    // parent state
        .state('hmo.contracts',{
            url: "/contracts",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/contracts/js/service.js',
                            'modules/hmo/contracts/js/controllers.js',


                        ]
                    });
                }]
            }
        })

        //list view
        .state('hmo.contracts.contractList', {
            url: "/",
            templateUrl: "modules/hmo/contracts/views/list.html",
            //controller: "HmoContractListCtrl",
            data: {pageTitle: 'PA'},

        })

        //create new / edit provider view
        .state('hmo.contracts.contractCreate', {
            url: "/create",
            templateUrl: "modules/hmo/contracts/views/create.html",
            //controller: "HmoContractCreateCtrl",
            data: {pageTitle: 'New Contract'},

        })

    
});
