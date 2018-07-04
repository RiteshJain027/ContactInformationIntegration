(function () {
	'use strict';

	angular.module('BlurAdmin.pages.components', [		
		'BlurAdmin.pages.components.addcontact',
		'BlurAdmin.pages.components.editcontact',
		'BlurAdmin.pages.components.deletecontact',
	])
		.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
			.state('components', {
				url: '/components',
				template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
				abstract: true,
				title: 'Components',
				sidebarMeta: {
					icon: 'ion-gear-a',
					order: 100,
				},
			});
	}

})();
