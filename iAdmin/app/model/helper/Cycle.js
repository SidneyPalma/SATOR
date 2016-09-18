//@charset UTF-8
Ext.define( 'iAdmin.model.helper.Cycle', {
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
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'duration',
            type: 'auto'
        }, {
            name: 'temperature',
            type: 'auto'
        }, {
            name: 'timetoopen',
            type: 'auto'
        }
    ]

});