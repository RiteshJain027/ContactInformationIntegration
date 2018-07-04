(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.deletecontact')
      .controller('deletecontactCtrl', deletecontactCtrl);
  
  function deletecontactCtrl($scope, contactService) {

	  angular.extend($scope, {
		  contactList: {
			  ContactId: '',
			  FullName: '',
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
	  function init() {
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
			  $scope.contactList = contactData.ContactList;
		  });
	  }
	  /**********************************************************************
	  Function setContactList End
	  **********************************************************************/
	  init();
  }
})();
