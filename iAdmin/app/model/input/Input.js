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
            name: 'unitmeasurementname',
            type: 'auto'
        }, {
            name: 'manufacturerid',
            type: 'auto'
        }, {
            name: 'manufacturername',
            type: 'int'
        }, {
            name: 'providerid',
            type: 'int'
        }, {
            name: 'providername',
            type: 'auto'
        }, {
            name: 'codeanvisa',
            type: 'auto'
        }, {
            name: 'controlstock',
            type: 'int'
        }, {
            name: 'isactive',
            type: 'int'
        }, {
            name: 'mandatorytesting',
            type: 'int'
        }, {
            name: 'minstock',
            type: 'auto'
        }, {
            name: 'maxstock',
            type: 'auto'
        }, {
            name: 'deadline',
            type: 'int'
        }, {
            name: 'resetpoint',
            type: 'auto'
        }, {
            name: 'validityactivation',
            type: 'int'
        }
    ]

});