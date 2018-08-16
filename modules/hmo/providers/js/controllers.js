/**
 * Created by JFlash on 7/31/18.
 */

angular.module('BmsApp')

//providers List controller

    .controller('ProvidersListCtrl', function($scope,$compile, $activityIndicator, UserService, $state, DTOptionsBuilder, DTColumnBuilder, DTDefaultOptions, ProviderService) {
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
            }
        );
    
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('state.name').withTitle('State ID'),
        DTColumnBuilder.newColumn('tier.name').withTitle('Tier'),
        DTColumnBuilder.newColumn('status.name').withTitle('Status'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(function(data, type, full, meta) {
                // you should use full.id instead of data.id here
                // they shouldnt be able to delete a provider here, so i removed the delete button
                return '<a ui-sref="hmo.providers.providersView({id:'+full.id+'})" class="btn btn-primary btn-sm" style="border-radius: 5px" title="View details"><i class="fa fa-eye"></i></a>'
            }),
    ];

    DTDefaultOptions.setLanguage({
            searchPlaceholder: "State, Status, Tier"
    });
    
})

//provider create controller
.controller('ProvidersCreateCtrl', function($scope, ProviderService, OptionService, ProviderService) {
    $scope.status = {};
    $scope.statuses = [];

    $scope.tier = {};
    $scope.tiers = [];

    $scope.state = {};
    $scope.states = [];

    ProviderService.getProviderTier()
    .success(function(response){
        $scope.tiers = response;
        console.log(response.message);
    })
    .error(function(response){
        console.log(response.message);
    });

    ProviderService.getProviderStatus()
    .success(function(response){
        $scope.statuses = response;
    })
    .error(function(response){
        console.log(response.message);
    });

    OptionService.getStates().success(function (resp) {
        $scope.states = resp;
    });

    $scope.createProvider = function (){
        if ($scope.providerCreateForm.$valid) {
            var newDataObj = {
                "provider": {
                    "name": $scope.name,
                    "rc_no": $scope.rc_no,
                    "address": $scope.address,
                    "state_id": $scope.state.state.id,
                    "email": $scope.email,
                    "phone": $scope.phone,
                    "website": $scope.website,
                    "rep_name": $scope.representative_name,
                    "rep_email": $scope.representative_email,
                    "rep_phone": $scope.representative_number,
                    "provider_status_id": $scope.status.status.id,
                    "provider_tier_id": $scope.tier.tier.id
                }
            };

            ProviderService.createNewProvider(newDataObj)
            .success(function(response){
                $('#providerCreateForm')[0].reset();
                $scope.state = {};
                swal('Success', 'Provider created successfully', 'success');
            })
            .error(function(response){
                console.log(response.message);
            });
        }
    }
})

//provider view/edit controller
.controller('ProvidersViewCtrl', function($scope, $stateParams, ProviderService, OptionService) {
    $scope.status = {};
    $scope.statuses = [];

    $scope.tier = {};
    $scope.tiers = [];

    $scope.status = {};
    $scope.statuses = [];

    $scope.state = {};
    $scope.states = [];

    $scope.editView = false;

    ProviderService.fetchSingleByID($stateParams.id)
    .success(function(response){
        $scope.id = response.id;
        $scope.name = response.name;
        $scope.email = response.email;
        $scope.phone =  parseInt(response.phone, 10);
        $scope.address = response.address;
        $scope.state = response.state;
        $scope.rc_no = parseInt(response.rc_no, 10);
        $scope.tier = response.tier;
        $scope.status = response.status,
        $scope.representative_name = response.rep_name;
        $scope.representative_email = response.rep_email;
        $scope.representative_number = parseInt(response.rep_phone, 10);
    })
    .error(function(response){
        console.log(response.message);
    });

    OptionService.getStates()
    .success(function (resp) {
        $scope.states = resp;
    })
    .error(function(response){
        console.log(response.message);
    });

    ProviderService.getProviderTier()
    .success(function(response){
        $scope.tiers = response;
    })
    .error(function(response){
        console.log(response.message);
    });

    ProviderService.getProviderStatus()
    .success(function(response){
        $scope.statuses = response;
    })
    .error(function(response){
        console.log(response.message);
    });


    $scope.updateProvider = function (){
//        if ($scope.providerEditForm.$valid) {
            var newDataObj = {
                "id": $scope.id,
                "provider": {
                    "name": $scope.name,
                    "rc_no": $scope.rc_no,
                    "address": $scope.address,
                    "state_id": $scope.state.id,
                    "email": $scope.email,
                    "phone": $scope.phone,
                    "website": $scope.website,
                    "rep_name": $scope.representative_name,
                    "rep_email": $scope.representative_email,
                    "rep_phone": $scope.representative_number,
                    "provider_status_id": $scope.status.id,
                    "provider_tier_id": $scope.tier.id
                }
            };

            ProviderService.editSingleProvider($scope.id, newDataObj)
            .success(function (resp) {
                $scope.editView = false;
                swal('Success', 'Provider modified successfully', 'success');
            })
            .error(function(response){
                console.log(response.message);
            });
 //       }
    }
});