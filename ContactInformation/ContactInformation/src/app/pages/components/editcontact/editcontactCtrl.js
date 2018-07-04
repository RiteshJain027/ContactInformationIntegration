(function () {
	'use strict';

	angular.module('BlurAdmin.pages.components.editcontact')
		.controller('editcontactCtrl', editcontactCtrl);

	/** @ngInject */
	function editcontactCtrl($scope, contactService) {
		$scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		$scope.ph_numbr = /^\+?\d{10}$/;
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
			contact: {
				ContactId: '',
				FullName: '',
				FirstName: '',
				LastName: '',
				Email: '',
				PhoneNumber: '',
				Status: ''
			},
			modifyData: modifyData,
			updateContact: updateContact,
			clearData: clearData,
			selectedValue:'-1'
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
        Function modifyData Start
        **********************************************************************/
		function modifyData() {
			var selectedValue = $scope.selectedValue;
			if (selectedValue != -1) {
				for (var i = 0; i < $scope.contactList.length; i++) {
					if ($scope.contactList[i].ContactId == selectedValue) {
						$scope.contact = $scope.contactList[i];
						if ($scope.contact.Status == true) {
							$scope.contact.Status = '1';
						}
						else {
							$scope.contact.Status = '0';
						}
					}
				}
			}
			else {
				clearData();
			}
			
		}
		/**********************************************************************
        Function modifyData End
        **********************************************************************/
		/**********************************************************************
        Function updateContact Start
        **********************************************************************/
		function updateContact(contact) {
			if (contact.Status == 1) {
				contact.Status = true;
			}
			else {
				contact.Status = false;
			}
			contactService.updateContact(contact).then(function (data) {				
				clearData();
				$scope.selectedValue = '-1';
				alert("Data Updated Successfully");
				setContactList();
			});		  
		}
		/**********************************************************************
        Function updateContact End
        **********************************************************************/
		/**********************************************************************
        Function clearData Start
        **********************************************************************/
		function clearData() {
			$scope.contact = [];
		}
		/**********************************************************************
        Function clearData End
        **********************************************************************/
		init();
	}
})();
