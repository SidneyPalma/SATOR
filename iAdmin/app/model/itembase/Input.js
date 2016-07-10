//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.Input', {
    extend: 'iAdmin.model.itembase.ItemBase',

    requires: [
        'iAdmin.model.itembase.ItemBase'
    ],

    classFields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'presentation',
            type: 'auto'
        }, {
            name: 'presentationdescription',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'providerid',
            type: 'int'
        }, {
            name: 'providername',
            type: 'auto'
        }, {
            name: 'hasbatch',
            type: 'boolean'
        }, {
            name: 'hasstock',
            type: 'boolean'
        }, {
            name: 'reactive',
            type: 'boolean'
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
        }
    ]

});