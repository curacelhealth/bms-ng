var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state(
		{
	    name: 'companies',
	    url: '/companies',
	    templateUrl: 'views/companies.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'providers',
	    url: '/providers',
	    templateUrl: 'views/providers.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'enrollees',
	    url: '/enrollees',
	    templateUrl: 'views/enrollees.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'pre-auth',
	    url: '/pre-auth',
	    templateUrl: 'views/pre-auth.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'tickets',
	    url: '/tickets',
	    templateUrl: 'views/tickets.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'admission-tracker',
	    url: '/admission-tracker',
	    templateUrl: 'views/admission-tracker.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'plans',
	    url: '/plans',
	    templateUrl: 'views/plans.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'benefits',
	    url: '/benefits',
	    templateUrl: 'views/benefits.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'enter-claims',
	    url: '/enter-claims',
	    templateUrl: 'views/enter-claims.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'view-claims',
	    url: '/view-claims',
	    templateUrl: 'views/view-claims.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'invoices',
	    url: '/invoices',
	    templateUrl: 'views/invoices.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'payment-history',
	    url: '/payment-history',
	    templateUrl: 'views/payment-history.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'pay-claims',
	    url: '/pay-claims',
	    templateUrl: 'views/pay-claims.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'accounts',
	    url: '/accounts',
	    templateUrl: 'views/accounts.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'claims',
	    url: '/claims',
	    templateUrl: 'views/claims.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'comms',
	    url: '/comms',
	    templateUrl: 'views/comms.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'finance',
	    url: '/finance',
	    templateUrl: 'views/finance.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'import-export',
	    url: '/import-export',
	    templateUrl: 'views/import-export.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'print-id',
	    url: '/print-id',
	    templateUrl: 'views/print-id.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'integrations',
	    url: '/integrations',
	    templateUrl: 'views/integrations.html'
		}
	);

	$stateProvider.state(
		{
	    name: 'users',
	    url: '/users',
	    templateUrl: 'views/users.html'
		}
	);

	$urlRouterProvider.otherwise('/companies');
});