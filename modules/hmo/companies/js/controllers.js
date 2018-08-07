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
        DTColumnBuilder.newColumn('company_name').withTitle('Company Name').notSortable(),
        DTColumnBuilder.newColumn('company_plan').withTitle('Plan')
            .renderWith(function (data,type,full) {
               return data +' '+full.plan
            }),
        
        DTColumnBuilder.newColumn('number_of_lives').withTitle('No Of Lives'),
        DTColumnBuilder.newColumn('sex').withTitle('Sex'),
        DTColumnBuilder.newColumn('company_rep_name').withTitle('Company Rep.Name'),
        DTColumnBuilder.newColumn('rep_telephone').withTitle('Rep.Telephone'),
        DTColumnBuilder.newColumn('rep_email').withTitle('Rep.Email'),
        DTColumnBuilder.newColumn('address').withTitle('Address'),
        DTColumnBuilder.newColumn('state').withTitle('State'),
        DTColumnBuilder.newColumn('action').withTitle('Action').notSortable()
                       .renderWith(function(data, type, full, meta) {
                return '<a ui-sref="hmo.companiesCreate({id:'+full.id+'})" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon m-btn--pill" title="Edit details"> <i class="la la-book"></i>View</a><br>'
            }),
    ];
});

//provider create / edit controller
BmsApp.controller('HmoCompaniesCreateCtrl', function($scope,$activityIndicator,UserService,$state,OptionService) {

    $scope.states = []
    OptionService.getStates().success(function (resp) {
        $scope.states = resp
    })
    
});

