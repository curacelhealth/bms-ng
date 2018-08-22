var BmsApp = angular.module('BmsApp',
	[
		'ui.router',
		'ngActivityIndicator',
        "oc.lazyLoad",
        'angular-jwt',
		'datatables',
		"ngSanitize",
		'ui.select',
        'ngFileUpload',
		'ngMask',
        'ui.bootstrap'
	]
)
	.constant('API_HOST', BMS_API) // from config.js
	.constant('API_HOST_AUTH', AUTH_API) // config.js
	.config(function Config($httpProvider, jwtOptionsProvider) {

		jwtOptionsProvider.config({
			unauthenticatedRedirectPath: 'login',
			whiteListedDomains:['curacel.co','localhost'],
			tokenGetter: ['UserService',function(UserService) {
				return UserService.loadToken();
			}],
			unauthenticatedRedirector: ['$state', function($state) {
				$state.go(this.unauthenticatedRedirectPath);
			}]
		});

		$httpProvider.interceptors.push('jwtInterceptor');
	})
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            // global configs go here
        });
    }])
	.run(["$rootScope", "$state","authManager","UserService", function($rootScope, $state,authManager,UserService) {
		$rootScope.$state = $state; // state to be accessed from view
		authManager.checkAuthOnRefresh();
		authManager.redirectWhenUnauthenticated();

        $rootScope.$on('tokenHasExpired', function() {
            UserService.logout();
        });

	}]);

var showError = function (title,err) {
    if(err.message.constructor===Array) err.message = err.message.join("<br/>")
    swal(title,err.message,'error')
}