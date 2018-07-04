(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.editcontact', ['BlurAdmin.services'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('components.editcontact', {
        url: '/editcontact',
        templateUrl: 'app/pages/components/editcontact/editcontact.html',
          title: 'Edit Contact',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 100,
          },
      });
  }
})();
