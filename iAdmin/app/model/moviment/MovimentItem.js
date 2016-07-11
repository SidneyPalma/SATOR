//@charset UTF-8
Ext.define( 'iAdmin.model.moviment.MovimentItem', {
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
            name: 'movimentid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'inputid',
            type: 'int'
        }, {
            name: 'presentation',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'presentationdescription',
            type: 'auto'
        }, {
            name: 'quantity',
            type: 'auto'
        }, {
            name: 'datevalidity',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'isactive',
            type: 'int'
        }, {
            name: 'lotpart',
            type: 'auto'
        }
    ]

});