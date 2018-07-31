/**
 * Created by JFlash on 7/31/18.
 */
//login controller
BmsApp.controller('LoginCtrl', function($scope,$activityIndicator,UserService,$state) {
    $scope.loginData = {email:"",password:""};
    $scope.login = function () {
        $activityIndicator.startAnimating()
        UserService.login($scope.loginData)

            .success(function (res) {

                UserService.saveToken(res.token);
                var user = UserService.getUserData();
                console.log(user);

                $state.go('app.home')

                $activityIndicator.stopAnimating();
            })

            .error(function (err) {
                $activityIndicator.stopAnimating();
                swal("Login Failed",err.message,'error');
            })
    }
});

//main controller for the app/dashboard after login
BmsApp.controller('AppCtrl', function($scope,$activityIndicator,UserService,$state) {
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
});

