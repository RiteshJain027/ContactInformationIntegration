/*****************************************************************************************
topMenuService Start
******************************************************************************************/
(function () {
    'use strict';

    angular.module('BlurAdmin.services')
        .service('topMenuService', topMenuService);

    /*****************************************************************************************
    topMenuService Start
    ******************************************************************************************/
    function topMenuService($http) {

        var _userInformation = {};
        var _isShowTopMenu = true;
        var _lenderPermissionList = [];
        var _roleList = [];

        this.getUserInformation = getUserInformation;
        this.getUserName = getUserName;
        this.setIsShowTopMenu = setIsShowTopMenu;
        this.isShowMenu = isShowMenu;
        this.getUserId = getUserId;
        this.hasPermission = hasPermission;
        this.hasRole = hasRole;
        this.getDisplayTextOfUser = getDisplayTextOfUser;
        this.getDisplayName = getDisplayName;

        /*****************************************************************************************
        Function setUserInformation Start
        ******************************************************************************************/
        function getUserInformation() {
            return $http.get(WEB_API_URL + '/Login/GetLoggedInUserDetail').then(function (response) {
                _userInformation = response.data.UserInformation;
                _lenderPermissionList = response.data.UserManagementWebAPIResponce.LenderPermission;
                _roleList = response.data.UserManagementWebAPIResponce.RoleList;
                return _userInformation;
            });
        }
        /*****************************************************************************************
        Function setUserInformation End
        ******************************************************************************************/

        /*****************************************************************************************
        Function getUserName Start
        ******************************************************************************************/
        function getUserName() {
            return _userInformation.UserName;
        }
        /*****************************************************************************************
        Function getUserName End
        ******************************************************************************************/
        /*****************************************************************************************
        Function getUserId Start
        ******************************************************************************************/
        function getUserId() {
            return _userInformation.UserId;
        }
        /*****************************************************************************************
        Function getUserId End
        ******************************************************************************************/

        /*****************************************************************************************
        Function setIsShowTopMenu Start
        ******************************************************************************************/
        function setIsShowTopMenu(isShow) {
            _isShowTopMenu = isShow;
        }
        /*****************************************************************************************
        Function setIsShowTopMenu End
        ******************************************************************************************/

        /*****************************************************************************************
        Function isShowMenu Start
        ******************************************************************************************/
        function isShowMenu() {
            return _isShowTopMenu;
        }
        /*****************************************************************************************
        Function isShowMenu End
        ******************************************************************************************/

        /*****************************************************************************************
        Function hasPermission Start
        ******************************************************************************************/
        function hasPermission(permission, lenderId) {
            var lenderPermissionList = angular.copy(_lenderPermissionList);
            if (lenderPermissionList != null && lenderPermissionList.length > 0) {
                if (lenderId != undefined) {
                    var lenderPermission = _.where(lenderPermissionList, { LenderId: lenderId });
                }
                else {
                    var lenderPermission = lenderPermissionList;
                }
                if (lenderPermission != null) {
                    if (lenderPermission[0].Permissions.length > 0) {
                        //return lenderPermission[0].Permissions.indexOf(permission) != -1;
                        for (var i = 0, length = lenderPermission[0].Permissions.length; i < length; i++) {
                            var lenPermission = lenderPermission[0].Permissions[i];
                            if (lenPermission.Permission == permission) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            else {
                return false;
            }
        }
        /*****************************************************************************************
        Function hasPermission End
        ******************************************************************************************/
        /*****************************************************************************************
        Function hasRole Start
        ******************************************************************************************/
        function hasRole() {
            if (_roleList != null && _roleList.length > 0) {
                return true;
            }
            return false;
        }
        /*****************************************************************************************
        Function hasRole End
        ******************************************************************************************/
        /*****************************************************************************************
        Function getDisplayTextOfUser Start
        ******************************************************************************************/
        function getDisplayTextOfUser() {
            if (_userInformation.DisplayName != null) {
                return _userInformation.DisplayName;
            }
            return _userInformation.UserName;
        }
        /*****************************************************************************************
        Function getDisplayTextOfUser End
        ******************************************************************************************/
        /*****************************************************************************************
        Function getUserName Start
        ******************************************************************************************/
        function getDisplayName() {
            if (_userInformation.DisplayName != null) {
                return _userInformation.DisplayName;
            }
            return null;
        }
        /*****************************************************************************************
        Function getUserName End
        ******************************************************************************************/
    }
    /*****************************************************************************************
    topMenuService End
    ******************************************************************************************/
})();
/*****************************************************************************************
topMenuService End
******************************************************************************************/