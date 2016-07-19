//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.ItemBaseServiceType', {
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
            name: 'itembaseid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'servicetype',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'servicetypedescription',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean',
            persist: true,
            critical: true
        }
    ]

});