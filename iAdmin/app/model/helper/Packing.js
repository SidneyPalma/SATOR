//@charset UTF-8
Ext.define( 'iAdmin.model.helper.Packing', {
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
            name: 'isactive',
            type: 'int'
        }, {
            name: 'validitydays',
            type: 'int'
        }
    ]

});