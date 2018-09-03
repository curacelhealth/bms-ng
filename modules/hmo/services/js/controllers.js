/**
 * Created by JFlash on 7/31/18.
 */
//enrollees List controller
angular.module('BmsApp')
    .controller('HmoServiceListCtrl', function($scope,$compile,$activityIndicator,EnrolleeService,$state,DTColumnBuilder,DTOptionsBuilder,UserService) {

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
        ,
    ];
})

//enrollee create / edit controller
    .controller('HmoServiceCreateCtrl', function ($scope,$state,$activityIndicator,ServicesService) {
    // enrollee companies
    // $scope.companies = [];
    // $scope.searchCompanies = function (q) {
    //     CompaniesService.fetchList(q,10).success(function (resp) {
    //         $scope.companies = resp;
    //     })
    // }

    $scope.types = []
    ServicesService.fetchServiceTypes()
        .success(function (resp) {
            $scope.types = resp
        })
        .error(function(err) {
            console.log(err)
        })

    //save service
    $scope.saveService = function () {
        $activityIndicator.startAnimating();
        console.log($scope.service)
        ServicesService.createService($scope.service)
            .success(function (resp) {
                $activityIndicator.stopAnimating()
                $scope.service = {}
                swal('Success', 'Service Created Successfully', 'success')
            })
            .error(function (err) {
                $activityIndicator.stopAnimating()
                swal('Error!', err.message, 'error')
            })
    }
    
});

