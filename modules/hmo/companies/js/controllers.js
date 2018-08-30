/**
 * Created by JFlash on 7/31/18.
 */
//Companies List controller
angular.module('BmsApp')
	.controller('HmoCompaniesListCtrl', function($scope,$compile,$activityIndicator,CompaniesService,$state,DTColumnBuilder,DTOptionsBuilder,UserService) {
   	$scope.dtInstance = {}; //instance reference for datatables
    $scope.filters = {}; // filters

    //initialize options for datatable grid on this scope
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            // dataSrc: 'data',
            url: CompaniesService.fetchListDTUrl(),
            type: 'GET',
            data: $scope.filters,
            headers: {
                Authorization: 'Bearer ' + UserService.loadToken()
            }
        })
        // or here
        .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers')

        .withOption('fnRowCallback',
            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $compile(nRow)($scope);
            });

            //create columns for this grid
    $scope.dtColumns = [
    	DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('name').withTitle('Company Name').notSortable(),
        // DTColumnBuilder.newColumn('email').withTitle('Email'),        
        // DTColumnBuilder.newColumn('phone').withTitle('Phone'),
        // DTColumnBuilder.newColumn('website').withTitle('Website'),
        // DTColumnBuilder.newColumn('address').withTitle('Address'),
        // DTColumnBuilder.newColumn('state_id').withTitle('State')
        //          .renderWith(function(data,type,full) {
        //         if(full.status)
        //             return full.status.name
        //         else  return ''
        //     }),
        DTColumnBuilder.newColumn('code').withTitle('Code').notSortable(),
        DTColumnBuilder.newColumn('status.name').withTitle('Status').notSortable(),
        // DTColumnBuilder.newColumn('company_plan_id').withTitle('Plan')
        //             .renderWith(function (data,type,full) {
        //         if(full.plan)
        //             return full.plan.name
        //         else  return ''
        //     }),
        // DTColumnBuilder.newColumn('rep_name').withTitle('Rep.Name'),
        // DTColumnBuilder.newColumn('rep_phone').withTitle('Rep.Phone'),
        // DTColumnBuilder.newColumn('rep_email').withTitle('Rep.Email'),
        DTColumnBuilder.newColumn('action').withTitle('').notSortable()
             .renderWith(function(data, type, full, meta) {
                return '<a ui-sref="hmo.companies.companiesView({id:'+full.id+'})" class="btn btn-primary btn-sm" style="border-radius: 5px" title="View details"><i class="fa fa-eye"></i></a>&nbsp;'
            }),
    ];
})

// //company create controller
 .controller('HmoCompaniesCreateCtrl', function($scope,$activityIndicator,UserService,$state,OptionService,CompaniesService) {
     $scope.all_status = []
     CompaniesService.fetchAllStatus()
         .success(function (response) {
             $scope.all_status = response
         })
         .error(function (response) {
             console.log(response.message);
         });

    $scope.companies = []
    CompaniesService.fetchList('', 50)
    .success(function(response) {
        $scope.companies = response
    })
    .error(function(response) {
        console.log(response)
    })

    $scope.states = []
    OptionService.getStates().success(function (resp) {
        $scope.states = resp
    });
    
    $scope.createCompany = function() {
        if (true) {
            // var newDataObj = {"name":$scope.name,"email":$scope.email,"phone":$scope.phone,
            // "website":$scope.website,"address":$scope.address,"state_id":$scope.state_id,
            // "status_code":$scope.status_code,"company_plan_id":$scope.company_plan_id,
            // "rep_name":$scope.rep_name,"rep_phone":$scope.rep_phone,"rep_email":$scope.rep_email,
            // "staff_strength": $scope.staff_strength, "parent_company_id": $scope.parent_company_id};
            CompaniesService.createNewCompany($scope.company)
            .success(function(response) {
                $scope.provider = {};
                swal('Success', 'Company created successfully', 'success');
            })
            .error(function(response) {
                console.log(response);
            });
    	}
    }

    $scope.resetForm = function() {
        $state.reload()
    }
})


//Controller for single company
.controller('HmoCompaniesViewCtrl', function($scope,$stateParams,CompaniesService,OptionService) {
	CompaniesService.fetchSingleByID($stateParams.id)
	.success(function(response) {
		$scope.state ={};
		$scope.id = response.id;
		$scope.name = response.name;
		$scope.email = response.email;
		$scope.phone = parseInt(response.phone, 13);
		$scope.website = response.website;
		$scope.address = response.address;
		$scope.state_id = response.state_id;
		$scope.status_code = parseInt(response.status_code, 5);
		$scope.company_plan_id = response.company_plan_id;
		$scope.rep_name = response.rep_name;
		$scope.rep_phone = parseInt(response.rep_phone, 13);
		$scope.rep_email = response.rep_email;

		$scope.states = [];
        OptionService.getStates().success(function (resp) {
            $scope.states = resp;
        });
	})
	.error(function(response){
		console.log(response.message)
    });

    // Get all states
    $scope.states = []
    OptionService.getStates()
        .success(function (resp) {
            $scope.all_states = resp
        })
        .error(function (response) {
            console.log(response.message);
        });

    // Get all status
    $scope.all_status = []
    CompaniesService.fetchAllStatus()
        .success(function (response) {
            $scope.all_status = response
        })
        .error(function (response) {
            console.log(response.message);
        });
    
    // Update company info
	$scope.companyUpdate = function (){
        if ($scope.companyEditForm.$valid) {
            var editedDataObj = {
                "name": $scope.name, "email": $scope.email, "phone": $scope.phone,
                "website": $scope.website, "address": $scope.address, "state_id": $scope.state_id,
                "status_code": $scope.status_code, "company_plan_id": $scope.company_plan_id,
                "rep_name": $scope.rep_name, "rep_phone": $scope.rep_phone, "rep_email": $scope.rep_email,
                "staff_strength": $scope.staff_strength, "parent_company_id": $scope.parent_company_id
            };

            CompaniesService.editCompany($stateParams.id, data)
                .success(function (response) {
                    $scope.all_status = response
                })
                .error(function (response) {
                    console.log(response.message);
                });
        } else {
            console.log('hi')
            swal('Error!', 'KIndly fill all required fields', 'error')
        }
    }
})

//Controller for company staff
.controller('CompaniesStaffTabCtrl', function ($scope, $compile, $stateParams, EnrolleeService, UserService, DTColumnBuilder, DTOptionsBuilder, DTDefaultOptions) {
    var vm = this;
    vm.dtInstance = {}; //instance ref for data tables
    vm.filters = { company_id: $stateParams.id }; // filters

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
                console.log(nRow)
                $compile(nRow)($scope); // this ensures angular directives are compiled after each row is created
            }
        );

    vm.dtColumns = [

        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('photo').withTitle('Photo').notSortable()
            .renderWith(function (data, type, full) {
                if (data) return "<img src='" + full.photo_thumb + "'/>"
                else return ''
            }),
        DTColumnBuilder.newColumn('insurance_no').withTitle('Insurance No').notSortable(),
        DTColumnBuilder.newColumn('first_name').withTitle('Name')
            .renderWith(function (data, type, full) {
                return data + ' ' + full.last_name
            }),

        //DTColumnBuilder.newColumn('phone').withTitle('Phone'),
        DTColumnBuilder.newColumn('sex').withTitle('Sex')
            .renderWith(function (data, type, full) {
                return EnrolleeService.getSex(data)
            }),
        DTColumnBuilder.newColumn('enrollee_plan_id').withTitle('Plan')
            .renderWith(function (data, type, full) {
                if (full.plan)
                    return full.plan.name
                else return ''
            }),

        DTColumnBuilder.newColumn('enrollee_status_code').withTitle('Status').notSortable()
            .renderWith(function (data, type, full) {
                if (full.status)
                    return full.status.name
                else return ''
            }),
        DTColumnBuilder.newColumn('created_at').withTitle('Created'),
        DTColumnBuilder.newColumn('action').withTitle('').notSortable()
            .renderWith(function (data, type, full) {
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