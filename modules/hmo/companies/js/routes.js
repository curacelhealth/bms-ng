/**
 * Created by JFlash on 7/31/18.
 */
BmsApp.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    
        //Companies list view
        .state('hmo.companiesList', {
            url: "/companies",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/companies/views/list.html",
                    controller: "HmoCompaniesListCtrl",

                }
            },
            data: {pageTitle: 'Companies'},

        })

        //create new / edit provider view
        .state('hmo.companiesCreate', {
            url: "/companies/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/companies/views/create.html",
                    controller: "HmoCompaniesCreateCtrl",
                }
            },
            data: {pageTitle: 'New Company'},

        })

    
});
