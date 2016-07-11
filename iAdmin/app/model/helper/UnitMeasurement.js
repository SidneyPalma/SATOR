//@charset UTF-8
Ext.define( 'iAdmin.model.helper.UnitMeasurement', {
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
            name: 'acronym',
            type: 'auto'
        }, {
            name: 'packing',
            type: 'auto'
        }, {
            name: 'baseunit',
            type: 'auto'
        }, {
            name: 'measurebase',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});