/**
 * Created by JFlash on 7/31/18.
 */
BmsApp.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    // login

        .state('login', {
            url: "/login",
            views:{
                "main":{
                    templateUrl: "modules/main/views/login.html",
                    controller: "LoginCtrl",
                }
            },
            data: {pageTitle: 'Login'},
        })


        //app dashboard parent route (abstract)
        .state('app', {
            url: "/app",

            abstract:true,
            views:{
                "main":{
                    templateUrl: "modules/main/views/app.html",
                    controller: "AppCtrl"
                }
            }
        })

        //app homepage i.e dashboard home
        .state('app.home', {
            url: "/home",
            views:{
                "dash":{
                    templateUrl: "modules/main/views/home.html",
                    //controller: "HomeCtrl",

                }
            },
            data: {pageTitle: 'Dashboard'},

        })

    $urlRouterProvider.otherwise("/login");
});
