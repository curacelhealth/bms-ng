/**
 * Created by JFlash on 7/31/18.
 */
BmsApp.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    
        //providers list view
        .state('app.providersList', {
            url: "/providers",
            views:{
                "dash":{
                    templateUrl: "modules/providers/views/list.html",
                    controller: "ProvidersListCtrl",

                }
            },
            data: {pageTitle: 'Providers'},

        })

        //create new / edit provider view
        .state('app.providersCreate', {
            url: "/providers/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/providers/views/create.html",
                    controller: "ProvidersCreateCtrl",
                }
            },
            data: {pageTitle: 'New Provider'},

        })

    
});
