//@charset UTF-8
Ext.define( 'iAdmin.model.profile.ProfileMenu', {
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
            name: 'menuid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'name',
            type: 'auto',
            persist: false
        }
    ]

});