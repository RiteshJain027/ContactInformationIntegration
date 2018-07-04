(function () {
	'use strict';

	angular.module('BlurAdmin.pages.components.editcontact')
		.controller('editcontactCtrl', editcontactCtrl);

	/** @ngInject */
	function editcontactCtrl($scope, contactService) {
		
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
			modifyData: modifyData
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

		function modifyData() {
			var selectedValue = $scope.selectedValue;
			for (var i = 0; i < $scope.contactList.Length;i++)
			{
				if ($scope.contactList[i].ContactId == selectedValue) {
					$scope.contact = $scope.contactList[i];
				}
			}
			//alert(selectedValue + " ");
		}
		init();
	}
})();
