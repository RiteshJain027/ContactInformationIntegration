(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.addcontact')
      .controller('addcontactCtrl', addcontactCtrl);

  /** @ngInject */
  function addcontactCtrl($scope, contactService) {

	  angular.extend($scope, {
		  contact: {
			  ContactId : '',
			  FirstName: '',
			  LastName: '',
			  Email: '',
			  PhoneNumber: '',
			  Status: '',
			  FullName:''
		  },
		  contactList: {
			  ContactId: '',
			  FullName: '',
			  FirstName: '',
			  LastName: '',
			  Email: '',
			  PhoneNumber: '',
			  Status: ''
		  },
		  addContactList: addContactList
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
			  $scope.contactList = contactData.ContactList;
		  });
	  }
      /**********************************************************************
      Function setContactList End
      **********************************************************************/

	  /**********************************************************************
	  Function addContactList Start
	  **********************************************************************/
	  function addContactList(contact) {
		  if (contact.Status == 1) {
			  contact.Status = true;
		  }
		  else {
			  contact.Status = false;
		  }
		  
		  contactService.insertContact(contact).then(function (data) {
			  alert("Data Added Successfully");
		  });		  
	  }
      /**********************************************************************
      Function addContactList End
      **********************************************************************/
	  init();
  }
})();
