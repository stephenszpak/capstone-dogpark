"use strict";

app.controller("ContactCtrl", function($scope, $rootScope, ContactsFactory) {
    $scope.contacts = [];
    $scope.selectedContact = [];

    // modal init
    $(document).ready(function(){
        $('.modal').modal();
    });


    function getContacts() {
        ContactsFactory.getContacts($rootScope.user.uid).then(function(usersContacts) {
            $scope.contacts = usersContacts;
        });
    }

    getContacts();

    $scope.deleteContact = function(contactId) {
        ContactsFactory.deleteContact(contactId).then(function() {
            getContacts();
        });
    };

    $scope.viewContact = function(contact) {
        $scope.selectedContact = contact;
    };

    $scope.editContact = function(contact) {
        ContactsFactory.editContact(contact).then(function() {
            getContacts();
        });
    };

    $scope.addContact = function(contact) {
        ContactsFactory.addContact($rootScope.user.uid, contact).then(function() {
            getContacts();
        });
    };

});