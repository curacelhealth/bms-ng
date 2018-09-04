/**
 * Created by JFlash on 7/31/18.
 */

angular.module('BmsApp')
//login controller
    .controller('LoginCtrl', function($scope,$activityIndicator,UserService,$state) {
        $scope.loginData = {email:"",password:""};
        $scope.login = function () {
            $activityIndicator.startAnimating()
            UserService.login($scope.loginData)

                .success(function (res) {

                    UserService.saveToken(res.token);
                    var user = UserService.getUserData();
                    console.log(user);

                    $state.go('hmo.home')

                    $activityIndicator.stopAnimating();
                })

                .error(function (err) {
                    $activityIndicator.stopAnimating();
                    swal("Login Failed",err.message,'error');
                })
        }
    })

    //app controller for the app/dashboard after login

    .controller('AppCtrl', function($scope,$activityIndicator,UserService,$state,$timeout) {
        $scope.user = UserService.getUserData();




        $scope.logout = function(){
            swal({
                title: 'Logout Now?',
                text: "Proceed with logout?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    UserService.logout();
                }
            } )

        }

        $(function () {
            $('body').layout('fix')
        })

    });

