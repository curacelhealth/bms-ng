/**
 * Created by JFlash on 7/31/18.
 */
//enrollees List controller
angular.module('BmsApp')
    .controller('HmoServiceListCtrl', function ($scope,$compile,$activityIndicator,ServicesService,$state,DTColumnBuilder,DTOptionsBuilder,UserService) {

        $scope.dtInstance = {}; //instance ref for data tables
        $scope.filters = {}; // filters



        //init options for datatable grid on this scope
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                // Either you specify the AjaxDataProp here
                // dataSrc: 'data',
                url: ServicesService.fetchListDTUrl(),
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
            DTColumnBuilder.newColumn('name').withTitle('Name').notSortable(),
            DTColumnBuilder.newColumn('type.name').withTitle('Type'),
            DTColumnBuilder.newColumn('created_at').withTitle('Created'),
            DTColumnBuilder.newColumn('action').withTitle('').notSortable()
                .renderWith(function (data, type, full) {
                    var actions = [];
                    var view = '<a ng-click="editServiceModal(' + full.id + ')" class="btn btn-info btn-xs"><i class="fa fa-edit"></i></a>';
                    actions.push(view);

                    return actions.join(" ");
                })
            ,
            DTColumnBuilder.newColumn('action').withTitle('').notSortable()
                .renderWith(function(data, type, full) {
                    var actions = [];
                    var view = '<a ng-click="deleteService(' + full.id + ')" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i></a>';
                    actions.push(view);
                
                    return actions.join(" ");
                })
            ,
        ];

        $scope.current_service = {}
        $scope.editServiceModal = function(data) {
            $scope.current_service = data
            $("#editModal").modal('show')
        }
        
        $scope.deleteService = function(id) {
            var r = confirm("Are you sure you want to delete this service?")
            if (r == true) {
                $activityIndicator.startAnimating();
                ServicesService.deleteService(id)
                    .success(function (resp) {
                        $activityIndicator.stopAnimating()
                        swal('Alert!', 'Service deleted', 'info')
                        $state.reload();
                    })
                    .error(function (err) {
                        $activityIndicator.stopAnimating()
                        swal('Error!', err.message, 'error')
                        $state.reload();
                    })
            }
        }
    })

    //enrollee create / edit controller
    .controller('HmoServiceCreateCtrl', function ($scope,$state,$activityIndicator,ServicesService) {
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
            ServicesService.createService({ service: $scope.service })
                .success(function (resp) {
                    $activityIndicator.stopAnimating()
                    $scope.service = {}
                    $state.reload()
                    swal('Success', 'Service Created Successfully', 'success')
                })
                .error(function (err) {
                    $activityIndicator.stopAnimating()
                    $scope.service = {}
                    $state.reload()
                    swal('Error!', err.message, 'error')
                })
        }
        
    })

