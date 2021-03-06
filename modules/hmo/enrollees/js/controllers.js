/**
 * Created by JFlash on 7/31/18.
 */
//enrollees List controller
angular.module('BmsApp')
    .controller('HmoEnrolleeListCtrl', function($scope,$compile,$activityIndicator,EnrolleeService,$state,DTColumnBuilder,DTOptionsBuilder,UserService) {

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
            DTColumnBuilder.newColumn('company_id').withTitle('Company')
                .renderWith(function (data,type,full) {
                    if(full.company)
                        return full.company.name
                    else return ''
                }),

            //DTColumnBuilder.newColumn('phone').withTitle('Phone'),
            DTColumnBuilder.newColumn('sex').withTitle('Sex')
                .renderWith(function (data,type,full) {
                    return EnrolleeService.getSex(data)
                }),
            /*DTColumnBuilder.newColumn('enrollee_plan_id').withTitle('Plan')
                .renderWith(function (data,type,full) {
                    if(full.plan)
                        return full.plan.name
                    else  return ''
                }),*/

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
                    var view = '<a  class="btn btn-default btn-xs" ui-sref="hmo.enrollees.enrolleeDetail({id:'+full.id+'})"><i class="fa fa-eye"></i></a>';
                    actions.push(view);

                    return actions.join(" ");
                })
            ,
        ];
    })

    //enrollee create / edit controller
    .controller('HmoEnrolleeCreateCtrl', function($scope,$stateParams,$activityIndicator,ProviderService,UserService,$state,CompaniesService,EnrolleeService,OptionService,Upload) {

        //init enrolle object only if in create view
        if(!angular.isDefined($stateParams.id)) $scope.enrollee = {type:'P'}


        //edit mode
        $scope.setEditMode = function(bool){
            $scope.edit_mode = bool;
        }

        //photo
        $scope.photoSelected = function(file){
            Upload.base64DataUrl(file).then(function (bs64) {
                $scope.enrollee.photo = {
                    base64:bs64,
                    name:file.name
                }

            })
        }

        // enrollee companies
        $scope.companies = [];
        $scope.searchCompanies = function (q) {
            CompaniesService.fetchList(q,10).success(function (resp) {
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

        // providers
        $scope.providers = [];
        $scope.searchProviders = function (q) {
            ProviderService.fetchList(q,10).success(function (resp) {
                $scope.providers = resp;
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

        //submit enrollee
        $scope.submitEnrollee = function () {
            $activityIndicator.startAnimating();

            if(angular.isDefined($scope.enrollee.id)){
                EnrolleeService.update($scope.enrollee.id,$scope.enrollee)
                    .success(function (resp) {
                        $activityIndicator.stopAnimating()
                        swal('Enrollee Updated Successfully','','success')
                    })
                    .error(function (err) {
                        $activityIndicator.stopAnimating()
                        showError('Error Updating Enrollee',err)
                    })

            }else {
                EnrolleeService.createNew($scope.enrollee)
                    .success(function (resp) {
                        $activityIndicator.stopAnimating()
                        $scope.enrollee = {}
                        swal('Enrollee Created Successfully','','success')
                    })
                    .error(function (err) {
                        $activityIndicator.stopAnimating()
                        showError('Error Creating Enrollee',err)
                    })
            }
        }

    })

    //enrollee detail
    .controller('HmoEnrolleeDetailCtrl',function ($scope, $activityIndicator, EnrolleeService, $stateParams) {
        if($stateParams.id){
            $activityIndicator.startAnimating()
            EnrolleeService.fetchSingleByID($stateParams.id).success(function (resp) {
                $scope.enrollee = resp;
                $scope.enrollee.photo = null;
                $activityIndicator.stopAnimating()
            })
                .error(function (err) {
                    console.log(err)
                    $activityIndicator.stopAnimating()
                })
        }
    })