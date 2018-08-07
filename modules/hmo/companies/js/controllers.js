/**
 * Created by JFlash on 7/31/18.
 */
//Companies List controller
BmsApp.controller('HmoCompaniesListCtrl', function($scope,$activityIndicator,UserService,$state) {
    
});

//provider create / edit controller
BmsApp.controller('HmoCompaniesCreateCtrl', function($scope,$activityIndicator,UserService,$state,OptionService) {

    $scope.states = []
    OptionService.getStates().success(function (resp) {
        $scope.states = resp
    })
    
});

