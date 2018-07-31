var BmsApp = angular.module('BmsApp',
	[
		'ui.router',
		'ngActivityIndicator',
		'angular-jwt',
	]
)
	.constant('API_HOST', BMS_API) // from config.js
	.constant('API_HOST_AUTH', AUTH_API) // config.js
