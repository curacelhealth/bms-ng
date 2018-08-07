/**
 * Created by JFlash on 7/31/18.
 */
//enrollees List controller
BmsApp.controller('HmoEnrolleeListCtrl', function($scope,$activityIndicator,EnrolleeService,$state,DTColumnBuilder,DTOptionsBuilder,UserService) {

    $scope.dtInstance = {}; //instance ref for data tables
    $scope.filters = {}; // filters


    //init options for datatable grid on this scope
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            // dataSrc: 'data',
            url: EnrolleeService.fetchListDTUrl(),
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
        DTColumnBuilder.newColumn('insurance_no').withTitle('Insurance No').notSortable(),
        DTColumnBuilder.newColumn('first_name').withTitle('Name')
            .renderWith(function (data,type,full) {
               return data +' '+full.last_name
            }),
        
        DTColumnBuilder.newColumn('phone').withTitle('Phone'),
        DTColumnBuilder.newColumn('sex').withTitle('Sex'),
        DTColumnBuilder.newColumn('enrollee_plan_id').withTitle('Plan')
            .renderWith(function (data,type,full) {
                if(angular.isDefined(full.plan))
                    return full.plan.name
                else  return ''
            }),
        
        DTColumnBuilder.newColumn('enrollee_status_code').withTitle('Status').notSortable()
            .renderWith(function(data,type,full) {
                if(angular.isDefined(full.status))
                    return full.status.name
                else  return ''
            }),
        DTColumnBuilder.newColumn('created_at').withTitle('Created'),
        DTColumnBuilder.newColumn('action').withTitle('').notSortable()
            .renderWith(function(data, type, full) {
                var actions = [];
                var view = '<a href="#/hmo/piles/'+full.id+'/claims" class="btn btn-default btn-xs"><i class="fa fa-eye"></i></a>';
                actions.push(view);
               
                return actions.join(" ");
            })
        ,
    ];
});

//enrollee create / edit controller
BmsApp.controller('HmoEnrolleeCreateCtrl', function($scope,$activityIndicator,UserService,$state,CompanyService,EnrolleeService,OptionService) {
    $scope.enrollee = {
        type:'P'
    }


    // enrollee companies
    $scope.companies = [];
    $scope.searchCompanies = function (q) {
        CompanyService.fetchList(q,10).success(function (resp) {
            $scope.companies = resp;
        })
    }


    // principals
    $scope.principals = [];
    $scope.searchPrincipals = function (q) {
        EnrolleeService.fetchList(q,10,'P').success(function (resp) {
            $scope.principals = resp;
        })
    }

    //states
    $scope.states = []
    OptionService.getStates().success(function (resp) {
        $scope.states = resp
    })

    //plans
    $scope.plans = []
    EnrolleeService.fetchPlans().success(function (resp) {
        $scope.plans = resp
    })

    //statuses
    $scope.statuses = []
    EnrolleeService.fetchStatuses().success(function (resp) {
        $scope.statuses = resp
    })
    
});

