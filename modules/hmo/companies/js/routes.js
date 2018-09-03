/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp').config(function($stateProvider) {



    $stateProvider
    //companies parent state
        .state('hmo.companies',{
            url: "/companies",
            abstract: true,
            views:{"dash":{template:"<ui-view/>"}},
 
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',

                        files: [
                            'modules/hmo/companies/js/service.js',
                            'modules/hmo/companies/js/controllers.js',
                            'modules/hmo/companies/js/directives.js',
                            'modules/hmo/enrollees/js/service.js'
                        ]
                    });
                }]
            }
        })
    
        //Companies list view
        .state('hmo.companies.companiesList', {
            url: "/",
            templateUrl: "modules/hmo/companies/views/list.html",
            controller: "HmoCompaniesListCtrl",
            data: {pageTitle: 'Companies'},

        })

        //create new / edit company view
        .state('hmo.companies.companiesCreate', {
            url: "/create",
            templateUrl: "modules/hmo/companies/views/create.html",
            controller: "HmoCompaniesCreateCtrl",
            data: {pageTitle: 'New Company'},

        })

        //edit company view
        .state('hmo.companies.companiesEdit', {
            url: "/edit/:id",
            templateUrl: "modules/hmo/companies/views/edit.html",
            controller: "HmoCompaniesEditCtrl",
            data: {pageTitle: 'Companies'},

        })

          //Single Company view
        .state('hmo.companies.companiesView', {
            url: "/view/:id",
            templateUrl: "modules/hmo/companies/views/view.html",
            controller: "HmoCompaniesViewCtrl",
            data: {pageTitle: 'Companies'},
        })
        
});
