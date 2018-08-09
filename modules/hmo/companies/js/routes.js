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

        //create new / edit company view
        .state('hmo.companiesCreate', {
            url: "/companies/create",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/companies/views/create.html",
                    controller: "HmoCompaniesCreateCtrl",
                }
            },
            data: {pageTitle: 'New Company'},

        })

        //edit company view
        .state('hmo.companiesEdit', {
            url: "/companies/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/companies/views/edit.html",
                    controller: "HmoCompaniesEditCtrl",
                }
            },
            data: {pageTitle: 'Companies'},

        })

          //Single Company view
        .state('hmo.companiesView', {
            url: "/companies/view/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/companies/views/view.html",
                    controller: "HmoCompaniesViewCtrl"
                }
            },
            
            data: {pageTitle: 'Companies'},
        })
        
});
