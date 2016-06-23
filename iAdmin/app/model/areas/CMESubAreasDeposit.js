//@charset UTF-8
Ext.define( 'iAdmin.model.areas.CMESubAreasDeposit', {
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
            name: 'cmesubareasid',
            type: 'int'
        }, {
            name: 'cmesubareasname',
            type: 'auto'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});