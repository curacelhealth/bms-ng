var BmsApp = angular.module('BmsApp',
	[
		'ui.router',
		'ngActivityIndicator',
		'angular-jwt',
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