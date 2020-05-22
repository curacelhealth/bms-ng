/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider) {

    $stateProvider

    //parent state
        .state('hmo.providers',{
            url: "/providers",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},

            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/providers/js/service.js',
                            'modules/hmo/providers/js/controllers.js',
                            'modules/hmo/enrollees/js/service.js',
                            'modules/hmo/providers/js/directives.js'
                        ]
                    });
                }]
            }
        })
    
        //providers list view
        .state('hmo.providers.providersList', {
            url: "/",
            templateUrl: "modules/hmo/providers/views/list.html",
            controller: "ProvidersListCtrl",
            data: {pageTitle: 'Providers'},
        })

        //providers unit view
        .state('hmo.providers.providersView', {
            url: "/view/:id",
            templateUrl: "modules/hmo/providers/views/view.html",
            controller: "ProvidersViewCtrl",
            data: {pageTitle: 'Providers'},
        })
        
        //create create provider view
        .state('hmo.providers.providersCreate', {
            url: "/create",
            templateUrl: "modules/hmo/providers/views/create.html",
            controller: "ProvidersCreateCtrl",
            data: {pageTitle: 'Providers'},
        })
    
});
