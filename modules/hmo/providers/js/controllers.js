/**
 * Created by JFlash on 7/31/18.
 */
//providers List controller
BmsApp.controller('ProvidersListCtrl', function($scope,$compile, $activityIndicator, UserService, $state, DTOptionsBuilder, DTColumnBuilder,ProviderService) {
    var vm = this;
    //vm.dtOptions = DTOptionsBuilder.fromSource('modules/hmo/providers/data.json') 
    // .withPaginationType('full_numbers');

    vm.dtInstance = {}; //instance ref for data tables
    vm.filters = {}; // filters


    //init options for datatable grid on this scope, using ajax for data source
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            // dataSrc: 'data',
            url: ProviderService.fetchListDTUrl(), // get url from service for datatable requests
            type: 'GET',
            data: vm.filters,
            headers: {
                Authorization: 'Bearer ' + UserService.loadToken() // add token for authentication
            }
        })
        // or here
        .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers')

        .withOption('fnRowCallback',
            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $compile(nRow)($scope); // this ensures angular directives are compiled after each row is created
            });
    
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
                // you should use full.id instead of data.id here
                // they shouldnt be able to delete a provider here, so i removed the delete button
                return '<a ui-sref="hmo.providersCreate({id:'+full.id+'})" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon m-btn--pill" title="Edit details"> <i class="la la-book"></i>View</a><br>'+
                	   '<a ui-sref="hmo.providersView({id:'+full.id+'})" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon m-btn--pill" title="Edit details"> <i class="la la-edit"></i>Edit</a><br>'
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

