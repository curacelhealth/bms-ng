/**
 * Created by JFlash on 7/31/18.
 */
BmsApp.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    
        //providers list view
        .state('hmo.providersList', {
            url: "/providers",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/providers/views/list.html",
                    controller: "ProvidersListCtrl",
                }
            },
            data: {pageTitle: 'Providers'},

        })


        //providers unit view
        .state('hmo.providersView', {
            url: "/providers/view/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/providers/views/view.html",
                    controller: "ProvidersViewCtrl"
                }
            },
            
            data: {pageTitle: 'Providers'},
        })
        
        //create create provider view
        .state('hmo.providersCreate', {
            url: "/providers/create",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/providers/views/create.html",
                    controller: "ProvidersCreateCtrl",
                }
            },
            data: {pageTitle: 'Providers'},

        })
        
        //create edit provider view
        .state('hmo.providersEdit', {
            url: "/providers/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/providers/views/edit.html",
                    controller: "ProvidersEditCtrl",
                }
            },
            data: {pageTitle: 'Providers'},

        })

    
});
