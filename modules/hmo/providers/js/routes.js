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
                    controller: "HmoProvidersListCtrl",

                }
            },
            data: {pageTitle: 'Providers'},

        })

        //create new / edit provider view
        .state('hmo.providersCreate', {
            url: "/providers/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/providers/views/create.html",
                    controller: "HmoProvidersCreateCtrl",
                }
            },
            data: {pageTitle: 'New Provider'},

        })

    
});
