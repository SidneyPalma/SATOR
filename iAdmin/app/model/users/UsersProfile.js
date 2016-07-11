//@charset UTF-8
Ext.define( 'iAdmin.model.users.UsersProfile', {
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
            name: 'usersid',
            type: 'int',
            critical: true
        }, {
            name: 'profileid',
            type: 'int',
            critical: true
        }, {
            name: 'name',
            type: 'auto',
            persist: false
        }
    ]

});