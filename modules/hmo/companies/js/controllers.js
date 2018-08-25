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
        if ($scope.createCompanyForm.$valid) {
            var newDataObj = {"name":$scope.name,"email":$scope.email,"phone":$scope.phone,
            "website":$scope.website,"address":$scope.address,"state_id":$scope.state_id,
            "status_code":$scope.status_code,"company_plan_id":$scope.company_plan_id,
            "rep_name":$scope.rep_name,"rep_phone":$scope.rep_phone,"rep_email":$scope.rep_email,
            "staff_strength": $scope.staff_strength, "parent_company_id": $scope.parent_company_id};
            CompaniesService.createNewCompany(newDataObj)
            .success(function(response) {
                $('#companyCreateForm')[0].reset();
                $scope.state = {};
                swal('Success', 'Company created successfully', 'success');
            })
            .error(function(response) {
                console.log(response.message);
            });
    	}
    }

    $scope.resetForm = function() {
        $state.reload()
    }
})


//Controller for company edit
.controller('HmoCompaniesEditCtrl', function($scope,$stateParams,CompaniesService,OptionService) {
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
	 $scope.companyUpdate = function (){
        if ($scope.companyEditForm.$valid) {
            var editedDataObj ='{id: "'+$scope.id+'",name: "'+$scope.name+'",email: "'+$scope.email+'",phone: "'+$scope.phone+'", website: "'+$scope.website+'",address: "'+$scope.address+'",state_id: "'+$scope.state_id+'",status_code: "'+$scope.status_code+'",company_plan_id: "'+$scope.company_plan_id+'",rep_name: "'+$scope.rep_name+'",rep_phone: "'+$scope.rep_phone+'",rep_email: "'+$scope.rep_email+'"}';
        }
    }
})

//Company View Controller
.controller('HmoCompaniesViewCtrl', function($scope,$stateParams,CompaniesService) {
	CompaniesService.fetchSingleByID($stateParams.id)
	.success(function(response) {
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
	})
	.error(function(response){
		console.log(response.message);
	});
});

