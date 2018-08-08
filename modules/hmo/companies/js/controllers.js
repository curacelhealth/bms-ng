/**
 * Created by JFlash on 7/31/18.
 */
//Companies List controller
BmsApp.controller('HmoCompaniesListCtrl', function($scope,$activityIndicator,CompaniesService,$state,DTColumnBuilder,DTOptionsBuilder,UserService) {
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
        DTColumnBuilder.newColumn('name').withTitle('Comp.Name').notSortable(),
        DTColumnBuilder.newColumn('email').withTitle('Email'),        
        DTColumnBuilder.newColumn('phone').withTitle('Phone'),
        DTColumnBuilder.newColumn('website').withTitle('Website'),
        DTColumnBuilder.newColumn('address').withTitle('Address'),
        DTColumnBuilder.newColumn('state_id').withTitle('State')
                 .renderWith(function(data,type,full) {
                if(full.status)
                    return full.status.name
                else  return ''
            }),
        DTColumnBuilder.newColumn('status_code').withTitle('Status Code'),
        DTColumnBuilder.newColumn('company_plan_id').withTitle('Plan')
                    .renderWith(function (data,type,full) {
                if(full.plan)
                    return full.plan.name
                else  return ''
            }),
        DTColumnBuilder.newColumn('rep_name').withTitle('Rep.Name'),
        DTColumnBuilder.newColumn('rep_phone').withTitle('Rep.Phone'),
        DTColumnBuilder.newColumn('rep_email').withTitle('Rep.Email'),
        DTColumnBuilder.newColumn('action').withTitle('').notSortable()
                         .renderWith(function(data, type, full) {
                var actions = [];
                var view = '<a  class="btn btn-default btn-xs"><i class="fa fa-eye"></i></a>';
                actions.push(view);
               
                return actions.join(" ");
            })
        ,
    ];
});

//provider create / edit controller
BmsApp.controller('HmoCompaniesCreateCtrl', function($scope,$activityIndicator,UserService,$state,OptionService,CompaniesService) {

    $scope.states = []
    OptionService.getStates().success(function (resp) {
        $scope.states = resp
    })
    
    $scope.createCompany = function() {

    	if ($scope.companyCreateForm.$valid) {
    	var newDataObj = {"name":$scope.name,"email":$scope.email,"phone":$scope.phone,
    	"website":$scope.website,"address":$scope.address,"state_id":$scope.state_id,
    	"status_code":$scope.status_code,"company_plan_id":$scope.company_plan_id,
    	"rep_name":$scope.rep_name,"rep_phone":$scope.rep_phone,"rep_email":$scope.rep_email};
    	CompaniesService.createNewCompany(newDataObj)

    	.success(function(response) {
    		$('#companyCreateForm')[0].reset();
    		$scope.state = {};
            console.log(response.id);
            swal('Success', 'Company created successfully', 'success');
    	})

    	.error(function(response) {
    		console.log(response);
    	});
    	}
    }
});

