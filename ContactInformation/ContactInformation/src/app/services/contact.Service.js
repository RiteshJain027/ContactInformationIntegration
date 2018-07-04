/*****************************************************************************************
contactService Start
******************************************************************************************/
(function () {
    'use strict';

	angular.module('BlurAdmin.services').
        service('contactService', contactService);

    /*****************************************************************************************
    contactService Start
    ******************************************************************************************/
    function contactService($http) {

        this.getContactList = getContactList;
		this.getContactNameList = getContactNameList;        
        this.insertContact = insertContact;
        this.updateContact = updateContact;        
		this.deleteContact = deleteContact;
		
        /*****************************************************************************************
        Function getContactList Start
        ******************************************************************************************/
        function getContactList() {
			return $http.get(CONTACT_API_BASE_URL + 'GetContactList').then(function (response) {
                return response.data;
            });
        }
        /*****************************************************************************************
        Function getContactList End
        ******************************************************************************************/
		
		/*****************************************************************************************
        Function getContactNameList Start
        ******************************************************************************************/
        function getContactNameList() {
			return $http.get(CONTACT_API_BASE_URL + 'GetContactNameList').then(function (response) {
                return response.data;
            });
        }
        /*****************************************************************************************
        Function getContactList End
        ******************************************************************************************/
		        
        /*****************************************************************************************
        Function insertContact Start
        ******************************************************************************************/
		function insertContact(contactInfo) {			
			return $http.post(CONTACT_API_BASE_URL + 'AddContact', JSON.stringify(contactInfo)).then(function (response) {
                return response.data;
			});			
        }
        /*****************************************************************************************
        Function insertContact End
        ******************************************************************************************/

        /*****************************************************************************************
        Function updateContact Start
        ******************************************************************************************/
        function updateContact(contactInfo) {			
			return $http.post(CONTACT_API_BASE_URL + 'UpdateContact', JSON.stringify(contactInfo)).then(function (response) {
                return response.data;
            });
        }
        /*****************************************************************************************
        Function updateContact End
        ******************************************************************************************/ 
		
		/*****************************************************************************************
        Function deleteContact Start
        ******************************************************************************************/
        function deleteContact(contactId) {            
			return $http.post(CONTACT_API_BASE_URL + 'DeleteContact', JSON.stringify(contactId)).then(function (response) {
                return response.data;
            });
        }
        /*****************************************************************************************
        Function deleteContact End
        ******************************************************************************************/ 		
    }
    /*****************************************************************************************
    contactService End
    ******************************************************************************************/
})();
/*****************************************************************************************
contactService End
******************************************************************************************/
