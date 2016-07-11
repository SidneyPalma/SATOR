//@charset UTF-8
Ext.define( 'iAdmin.model.service.ServiceStructureField', {
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
            name: 'orderby',
            type: 'int'
        }, {
            name: 'servicestructureid',
            type: 'int'
        }, {
            name: 'resultfield',
            type: 'auto'
        }
    ]

});