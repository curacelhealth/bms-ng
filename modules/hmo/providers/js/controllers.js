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
            }
        );
    
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
                return '<a ui-sref="hmo.providersView({id:'+full.id+'})" class="btn btn-primary btn-sm" style="border-radius: 5px" title="View details"><i class="fa fa-eye"></i></a>&nbsp;'
            }),
    ];
    
});

//provider view controller
BmsApp.controller('ProvidersViewCtrl', function($scope, $stateParams, ProviderService) {
    ProviderService.fetchSingleByID($stateParams.id)
    .success(function(response){
        $scope.id = response.id;
        $scope.name = response.name;
        $scope.email = response.email;
        $scope.phone =  parseInt(response.phone, 10);
        $scope.address = response.address;
        $scope.state_name = response.state.name;
        $scope.rc_no =response.rc_no;
        $scope.provider_tier_id = response.provider_tier_id;
    })
    .error(function(response){
        console.log(response.message);
    });
});

//provider create controller
BmsApp.controller('ProvidersCreateCtrl', function($scope, ProviderService, OptionService) {
    $scope.state = {};

    $scope.states = [];
    OptionService.getStates().success(function (resp) {
        $scope.states = resp;
    });

    $scope.createProvider = function (){
        if ($scope.providerCreateForm.$valid) {
            var newDataObj={"name": $scope.name, "email": $scope.email, "phone": $scope.phone, "address": $scope.address, "state_id": $scope.state.state.id, "rc_no": $scope.rc_no, "provider_tier_id": $scope.provider_tier_id};
            ProviderService.createNewProvider(newDataObj)
            .success(function(response){
                $('#providerCreateForm')[0].reset();
                $scope.state = {};
                console.log(response.id);
                swal('Success', 'Provider created successfully', 'success');
            })
            .error(function(response){
                console.log(response.message);
            });
        }
    }
});

//provider edit controller
BmsApp.controller('ProvidersEditCtrl', function($scope, $stateParams, ProviderService, OptionService) {
    ProviderService.fetchSingleByID($stateParams.id)
    .success(function(response){
        $scope.state = {};
        $scope.id = response.id;
        $scope.name = response.name;
        $scope.email = response.email;
        $scope.phone =  parseInt(response.phone, 10);
        $scope.address = response.address;
        $scope.state.state = response.state;
        $scope.rc_no =response.rc_no;
        $scope.provider_tier_id = response.provider_tier_id;

        $scope.states = [];
        OptionService.getStates().success(function (resp) {
            $scope.states = resp;
        });
    })
    .error(function(response){
        console.log(response.message);
    });

    $scope.updateProvider = function (){
        if ($scope.providerEditForm.$valid) {
            var editedDataObj='{id: "'+$scope.id+'", name: "'+$scope.name+'", email: "'+$scope.email+'", phone: "'+$scope.phone+'", address: "'+$scope.address+'", state_id: "'+$scope.state.state.id+'", rc_no: "'+$scope.rc_no+'", provider_tier_id: "'+$scope.provider_tier_id+'"}';
        }
    }
});
