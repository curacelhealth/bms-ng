/**
 * Created by JFlash on 7/31/18.
 */
angular.module('BmsApp')
    .config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    // login

        .state('login', {
            url: "/login",
            views:{
                "main":{
                    templateUrl: "modules/global/app/views/login.html",
                    controller: "LoginCtrl",
                }
            },
            data: {pageTitle: 'Login'},
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',
                        //insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'modules/global/app/js/services/user.js',
                            'modules/global/app/js/controllers.js',
                        ]
                    });
                }]
            }
        })


        //hmo app dashboard parent route (abstract)
        .state('hmo', {
            url: "/hmo",
            data: {requiresLogin: true},
            abstract:true,
            views:{
                "main":{
                    templateUrl: "modules/global/app/views/hmo-app.html",
                    controller: "AppCtrl"
                }
            },

            resolve: {
                globalDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BmsApp',
                        //insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'modules/global/app/js/services/user.js',
                            'modules/global/app/js/services/options.js',
                            'modules/global/app/js/controllers.js',

                            //datatables
                            'libs/datatables/js/jquery.dataTables.min.js',
                            "libs/datatables/css/jquery.dataTables.min.css",
                        ]
                    });
                }],

            }

        })

        //hmo app homepage i.e dashboard home
        .state('hmo.home', {
            url: "/home",
            views:{
                "dash":{
                    templateUrl: "modules/global/app/views/hmo-home.html",
                    //controller: "HomeCtrl",

                }
            },
            data: {pageTitle: 'Dashboard'},

        })

    $urlRouterProvider.otherwise("/login");
});
