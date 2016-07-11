//@charset UTF-8
Ext.define( 'iAdmin.model.box.MaterialBoxItem', {
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
            name: 'materialboxid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'materialid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'materialname',
            type: 'auto'
        }, {
            name: 'boxitemstatus',
            type: 'auto'
        }, {
            name: 'boxitemstatusdescription',
            type: 'auto'
        }, {
            name: 'observation',
            type: 'auto'
        }
    ]

});