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
                .renderWith(function (data, type, full, meta) {
                    return `
                        <a ng-click="editServiceModal(` + full.id + `, ` + `'` + full.name.replace(' ', '+') + `'` + `, ` + `'` + full.type.code + `'` + `, ` + `'` + full.type.name + `'` + `)" class="btn btn-info btn-xs">
                            <i class="fa fa-edit"></i>
                        </a>

                        <a data-ng-click="deleteService(` + full.id + `)" class="btn btn-danger btn-xs">
                            <i class="fa fa-trash"></i>
                        </a>
                    `
                })
        ];

        $scope.types = []
        ServicesService.fetchServiceTypes()
            .success(function (resp) {
                $scope.types = resp
            })
            .error(function (err) {
                console.log(err)
            })

        $scope.service = {}
        $scope.editServiceModal = function (id, name, type_code, type_name) {
            $scope.service = { "s_id": id, "s_name": name.replace('+', ' '), "s_type_code": type_code, "s_type_name": type_name }
            angular.element("#editModal").modal('show');
        }

        $scope.editService = function() {
            var data = {
                "name": $scope.service.s_name,
                "type_code": $scope.service.s_type_code
            }

            ServicesService.updateService($scope.service.s_id, { service: data })
                .success(function (resp) {
                    $activityIndicator.stopAnimating()
                    angular.element("#editModal").modal('hide');
                    angular.element('.modal').remove();
                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass("modal-open");
                    swal('Alert!', 'Service edited', 'info');
                    $state.reload();
                })
                .error(function (err) {
                    $activityIndicator.stopAnimating();
                    angular.element("#editModal").modal('hide');
                    angular.element('.modal').remove();
                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass("modal-open");
                    swal('Error!', err.message, 'error');
                    $state.reload();
                })
        }
        
        $scope.deleteService = function(id) {
            swal({
                title: 'Are you sure you want to delete this service?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value == true) {
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
            })
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

