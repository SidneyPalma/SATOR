//@charset UTF-8
Ext.define( 'iAdmin.model.helper.MaterialStatus', {
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
            name: 'blocks',
            type: 'int'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});