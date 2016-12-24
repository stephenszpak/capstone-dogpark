"use strict";

app.controller("ContactCtrl", function($scope, $rootScope, ContactsFactory, UserFactory) {
    $scope.contacts = [];
    $scope.selectedContact = [];
    // modal init

        $('.modal').modal();



    function getUser() {
        UserFactory.getUser($rootScope.user.uid).then(function(data) {
            $scope.user = data;
        });
    }

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


    $scope.editUser = function(user) {
        UserFactory.editUser($rootScope.user.uid, user).then(function(data) {
            getUser();
        });
    };

    $scope.addContact = function(contact) {
        ContactsFactory.addContact($rootScope.user.uid, contact).then(function() {
            getContacts();
            contact = "";
        });
    };

});