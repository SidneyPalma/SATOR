//@charset UTF-8
Ext.define( 'iAdmin.model.areas.MaterialCycle', {
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
            name: 'materialid',
            type: 'int'
        }, {
            name: 'cycleid',
            type: 'int'
        }
    ]

});