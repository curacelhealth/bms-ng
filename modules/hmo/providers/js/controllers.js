/**
 * Created by JFlash on 7/31/18.
 */
//providers List controller
BmsApp.controller('ProvidersListCtrl', function($scope, $activityIndicator, UserService, $state, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('modules/hmo/providers/data.json')
        .withPaginationType('full_numbers');

    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn('phone').withTitle('Phone Number'),
        DTColumnBuilder.newColumn('address').withTitle('Home Address'),
        DTColumnBuilder.newColumn('state_id').withTitle('State ID'),
        DTColumnBuilder.newColumn('rc_no').withTitle('RC Number'),
        DTColumnBuilder.newColumn('provider_tier_id').withTitle('Provider Tier ID'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(function(data, type, full, meta) {
                return '<a href="#/hmo/providers/view/'+data.id+'" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon m-btn--pill" title="Edit details"> <i class="la la-book"></i>View</a><br>'+
                	   '<a href="#/hmo/providers/view/'+data.id+'" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon m-btn--pill" title="Edit details"> <i class="la la-edit"></i>Edit</a><br>'+
                	   '<a href="#/hmo/providers" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon m-btn--pill" title="Delete"> <i class="la la-trash"></i> Delete</a>';
            }),
    ];
    
});

//provider view controller
BmsApp.controller('ProvidersViewCtrl', function($scope, $stateParams, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.id = $stateParams.id;
    $scope.name = 'Test User';
    $scope.email = 'user@test.mail';
    $scope.phone = '234567890';
    $scope.address = 'Curacel base';
    $scope.state_id = '23401';
    $scope.rc_no ='what ever that is';
    $scope.provider_tier_id = 'tier120';

    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('t');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notVisible().notSortable(),
        DTColumnDefBuilder.newColumnDef(1).notSortable(),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];
});

//provider create controller
BmsApp.controller('ProvidersCreateCtrl', function($scope,$activityIndicator,UserService,$state) {
    
});

