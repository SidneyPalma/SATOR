//@charset UTF-8
Ext.define( 'iAdmin.model.areas.CMEAreasDeposit', {
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
            name: 'cmeareasid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }
    ]

});