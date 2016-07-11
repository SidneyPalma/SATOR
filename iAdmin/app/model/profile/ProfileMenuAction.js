//@charset UTF-8
Ext.define( 'iAdmin.model.profile.ProfileMenuAction', {
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
            name: 'profileid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'profilemenuid',
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