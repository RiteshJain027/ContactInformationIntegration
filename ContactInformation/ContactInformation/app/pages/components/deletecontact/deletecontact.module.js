(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.deletecontact', ['BlurAdmin.services'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('components.deletecontact', {
        url: '/deletecontact',
        templateUrl: 'app/pages/components/deletecontact/deletecontact.html',
          title: 'Delete Contact',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 100,
          },
      });
  }
})();
