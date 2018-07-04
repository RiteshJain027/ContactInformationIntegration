(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.addcontact', ['BlurAdmin.services'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('components.addcontact', {
        url: '/addcontact',
        templateUrl: 'app/pages/components/addcontact/addcontact.html',
          title: 'Add Contact',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 100,
          },
      });
  }
})();
