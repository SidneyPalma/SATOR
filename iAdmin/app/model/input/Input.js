//@charset UTF-8
Ext.define( 'iAdmin.model.input.Input', {
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
            name: 'description',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'unitmeasurementid',
            type: 'int'
        }, {
            name: 'erpcode',
            type: 'auto'
        }, {
            name: 'manufacturerid',
            type: 'int'
        }, {
            name: 'providerid',
            type: 'int'
        }, {
            name: 'codeanvisa',
            type: 'auto'
        }, {
            name: 'controlstock',
            type: 'boolean'
        }, {
            name: 'isactive',
            type: 'boolean'
        }, {
            name: 'mandatorytesting',
            type: 'boolean'
        }, {
            name: 'minstock',
            type: 'auto'
        }, {
            name: 'maxstock',
            type: 'auto'
        }, {
            name: 'resetpoint',
            type: 'auto'
        }, {
            name: 'deadline',
            type: 'int'
        }, {
            name: 'validityactivation',
            type: 'int'
        }
    ]

});