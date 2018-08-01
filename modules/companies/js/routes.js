/**
 * Created by JFlash on 7/31/18.
 */
BmsApp.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    
        //Companies list view
        .state('app.companiesList', {
            url: "/companies",
            views:{
                "dash":{
                    templateUrl: "modules/companies/views/list.html",
                    controller: "CompaniesListCtrl",

                }
            },
            data: {pageTitle: 'Companies'},

        })

        //create new / edit provider view
        .state('app.companiesCreate', {
            url: "/companies/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/companies/views/create.html",
                    controller: "CompaniesCreateCtrl",
                }
            },
            data: {pageTitle: 'New Company'},

        })

    
});
