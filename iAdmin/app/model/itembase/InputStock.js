//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.InputStock', {
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
            name: 'inputid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'datevalidity',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'presentation',
            type: 'auto'
        }, {
            name: 'lotpart',
            type: 'auto'
        }, {
            name: 'lotamount',
            type: 'auto'
        }
    ]

});