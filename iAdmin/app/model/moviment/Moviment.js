//@charset UTF-8
Ext.define( 'iAdmin.model.moviment.Moviment', {
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
            name: 'movimentdate',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'username',
            type: 'auto'
        }, {
            name: 'documentnumber',
            type: 'auto'
        }, {
            name: 'movimenttype',
            type: 'auto'
        }, {
            name: 'movimenttypedescription',
            type: 'auto'
        }, {
            name: 'documenttype',
            type: 'auto'
        }, {
            name: 'documenttypedescription',
            type: 'auto'
        }, {
            name: 'movimentstatus',
            type: 'auto'
        }, {
            name: 'movimentstatusdescription',
            type: 'auto'
        }
    ]

});