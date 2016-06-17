//@charset UTF-8
Ext.define( 'iAdmin.model.areas.Areas', {
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
            name: 'areastype',
            type: 'auto'
        }, {
            name: 'sterilizationflow',
            type: 'int'
        }, {
            name: 'sterilizationname',
            type: 'auto'
        }
    ]

});