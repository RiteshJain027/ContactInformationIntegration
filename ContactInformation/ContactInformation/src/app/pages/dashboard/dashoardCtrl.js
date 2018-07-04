(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('dashoardCtrl', dashoardCtrl);
  
  /** @ngInject */
  function dashoardCtrl($scope, contactService) {

	  angular.extend($scope, {
		  contact:{
			  FirstName: '',
			  LastName: '',
			  Email: '',
			  PhoneNumber: '',
			  Status: ''
		  }
	  });

	  /**********************************************************************
		Function init Start
	   **********************************************************************/
	  function init () {
		  setContactList();
	  }
	  /**********************************************************************
	  Function init End
	  **********************************************************************/
	  /**********************************************************************
	  Function setContactList Start
	  **********************************************************************/
	  function setContactList() {
		  contactService.getContactList().then(function (contactData) {
			  $scope.contact = contactData.ContactList;
		  });
	  }
        /**********************************************************************
        Function setContactList End
        **********************************************************************/
	  init();
  }
})();
