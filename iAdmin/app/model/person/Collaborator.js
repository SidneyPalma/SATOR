//@charset UTF-8
Ext.define( 'iAdmin.model.person.Collaborator', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'registration',
            type: 'int'
        }, {
            name: 'dateadmission',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'dateresignation',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'classcouncilid',
            type: 'int'
        }, {
            name: 'classcouncilname',
            type: 'auto'
        }, {
            name: 'classcouncilcode',
            type: 'auto'
        }, {
            name: 'usersid',
            type: 'int'
        }, {
            name: 'username',
            type: 'auto'
        }, {
            name: 'federationunit',
            type: 'auto'
        }, {
            name: 'federationunitdescription',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});