/**
 * Created by JFlash on 7/31/18.
 */
BmsApp.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    
        //providers list view
        .state('hmo.enrolleeList', {
            url: "/enrollees",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/enrollees/views/list.html",
                    controller: "HmoEnrolleeListCtrl",

                }
            },
            data: {pageTitle: 'Enrollees'},

        })

        //create new / edit provider view
        .state('hmo.enrolleeCreate', {
            url: "/enrollees/edit/:id",
            views:{
                "dash":{
                    templateUrl: "modules/hmo/enrollees/views/create.html",
                    controller: "HmoEnrolleeCreateCtrl",
                }
            },
            data: {pageTitle: 'New Enrollee'},

        })

    
});
