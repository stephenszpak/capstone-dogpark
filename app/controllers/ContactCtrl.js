"use strict";

app.controller("ContactCtrl", function($scope, $rootScope, ContactsFactory, UserFactory) {
    $scope.contacts = [];
    $scope.selectedContact = [];

    // modal init
    $('.modal').modal();



    function getContacts() {
        ContactsFactory.getContacts($rootScope.user.uid).then(function(usersContacts) {
            $scope.contacts = usersContacts;
        });
    }

    $scope.editContact = function(contact) {
        ContactsFactory.editContact(contact).then(function() {
            getContacts();
        });
    };

    getContacts();

    $scope.deleteContact = function(contactId) {
        ContactsFactory.deleteContact(contactId).then(function() {
            alertify.error('Contact removed');
            getContacts();
        });
    };

    $scope.viewContact = function(contact) {
        $scope.selectedContact = contact;
    };

    $scope.editContact = function(contact) {
        ContactsFactory.editContact(contact).then(function() {
            alertify.success('Contact Updated');
            getContacts();
        });
    };

    $scope.editUser = function(user) {
        UserFactory.editUser($rootScope.user.uid, user).then(function(data) {
            
        });
    };

    $scope.addContact = function(contact) {
        ContactsFactory.addContact($rootScope.user.uid, contact).then(function() {
            alertify.success('Contact Added');
            getContacts();
            contact = "";
        });
    };
});