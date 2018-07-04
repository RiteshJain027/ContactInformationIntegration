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
		  },
		  deleteContact: deleteContact,
		  selectedValue:'-1'
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
	   /**********************************************************************
	  Function deleteContact Start
	  **********************************************************************/
	  function deleteContact() {
		  var contactId = $scope.selectedValue;
		  if (contactId != undefined && contactId > 0) {
			  contactService.deleteContact($scope.selectedValue).then(function (response) {
				  alert("Record Delete Successfully");
				  $scope.selectedValue = '-1';
				  setContactList();
			  });
		  }
		  else {
			  alert("Please select the contact to delete.");
		  }		  
	  }
	  /**********************************************************************
	  Function deleteContact End
	  **********************************************************************/

	  init();
  }
})();
