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
                return '<a ui-sref="hmo.providers.providersView({id:'+full.id+'})" class="btn btn-primary btn-xs" title="View details"><i class="fa fa-eye"></i></a>'
            }),
    ];

    DTDefaultOptions.setLanguage({
            searchPlaceholder: "State, Status, Tier"
    });
    
})

//provider create controller
.controller('ProvidersCreateCtrl', function($scope, ProviderService, OptionService) {

    $scope.provider = {} // always use a containing object for such data

    //$scope.status = {}; no longer needed
    $scope.statuses = [];

    //$scope.tier = {}; no longer needed
    $scope.tiers = [];

    //$scope.state = {}; no longer
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
        if (true /*$scope.providerCreateForm.$valid not needed anymore*/) {

            /* not needed thanks to the container
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
            };*/

            ProviderService.createNewProvider({provider:$scope.provider}) // easy way to parse all the data with the container
            .success(function(response){
                //$('#providerCreateForm')[0].reset();// this is not the angular  way// imagine there was no jquery loaded
                $scope.provider = {};  //this is the angular way // another benefit of the container
                $scope.state = {};
                swal('Success', 'Provider created successfully', 'success');
            })
            .error(function(response){
                console.log(response.message);
            });
        }
    }
})

//provider view controller
.controller('ProvidersViewCtrl', function($scope, $compile, $activityIndicator, $state, $stateParams, ProviderService, EnrolleeService, OptionService, UserService, DTColumnBuilder, DTOptionsBuilder) {

	$scope.provider = {};

    ProviderService.fetchSingleByID($stateParams.id)
    .success(function(response){
    	$scope.provider = response;
    })
    .error(function(response){
        console.log(response);
    });

})

//Info tab controller
.controller('ProvidersInfoTabCtrl', function($scope, $compile, $activityIndicator, $state, $stateParams, ProviderService, EnrolleeService, OptionService, UserService, DTColumnBuilder, DTOptionsBuilder) {

    $scope.status = {};
    $scope.statuses = [];

    $scope.tier = {};
    $scope.tiers = [];

    $scope.status = {};
    $scope.statuses = [];

    $scope.state = {};
    $scope.states = [];

    $scope.editView = false;
    $scope.backupProvider = {};

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

    $scope.editProvider = function(){
    	$scope.backupProvider = $scope.provider;
    	$scope.editView = true;
    }

    $scope.updateProvider = function (){
        var newDataObj = {
            id: $scope.provider.id,
            provider: $scope.provider
        };

        ProviderService.editSingleProvider($scope.id, newDataObj)
        .success(function (resp) {
            $scope.editView = false;
            swal('Success', 'Provider modified successfully', 'success');
        })
        .error(function(response){
            console.log(response.message);
        });
    }

    $scope.resetProvider = function(){
    	$scope.provider = $scope.backupProvider;
    	$scope.editView = false;
    }
})

//Enrollees tab controller
.controller('ProvidersEnrolleeTabCtrl', function($scope, $compile, $activityIndicator, $state, $stateParams, ProviderService, EnrolleeService, OptionService, UserService, DTColumnBuilder, DTOptionsBuilder, DTDefaultOptions) {
	var vm = this;
    vm.dtInstance = {}; //instance ref for data tables
    vm.filters = {provider_id: $scope.provider.id}; // filters

console.log($scope.provider.id);
    //init options for datatable grid on this scope, using ajax for data source
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            // dataSrc: 'data',
            url: EnrolleeService.fetchListDTUrl(), // get url from service for datatable requests
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
        DTColumnBuilder.newColumn('photo').withTitle('Photo').notSortable()
            .renderWith(function (data,type,full) {
                if(data) return "<img src='"+full.photo_thumb+"'/>"
                else return ''
            }),
        DTColumnBuilder.newColumn('insurance_no').withTitle('Insurance No').notSortable(),
        DTColumnBuilder.newColumn('first_name').withTitle('Name')
            .renderWith(function (data,type,full) {
               return data +' '+full.last_name
            }),
        
        //DTColumnBuilder.newColumn('phone').withTitle('Phone'),
        DTColumnBuilder.newColumn('sex').withTitle('Sex')
            .renderWith(function (data,type,full) {
               return EnrolleeService.getSex(data)
            }),
        DTColumnBuilder.newColumn('enrollee_plan_id').withTitle('Plan')
            .renderWith(function (data,type,full) {
                if(full.plan)
                    return full.plan.name
                else  return ''
            }),
        
        DTColumnBuilder.newColumn('enrollee_status_code').withTitle('Status').notSortable()
            .renderWith(function(data,type,full) {
                if(full.status)
                    return full.status.name
                else  return ''
            }),
        DTColumnBuilder.newColumn('created_at').withTitle('Created'),
        DTColumnBuilder.newColumn('action').withTitle('').notSortable()
            .renderWith(function(data, type, full) {
                var actions = [];
                var view = '<a  class="btn btn-default btn-xs"><i class="fa fa-eye"></i></a>';
                actions.push(view);
               
                return actions.join(" ");
            })
    ];

    DTDefaultOptions.setLanguage({
            searchPlaceholder: "Search enrollee"
    });
})