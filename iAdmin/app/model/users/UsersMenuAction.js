//@charset UTF-8
Ext.define( 'iAdmin.model.users.UsersMenuAction', {
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
            persist: true,
            critical: true
        }, {
            name: 'usersmenuid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'menuactionid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'menuid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'expireto',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'directive',
            type: 'auto'
        }
    ]

});