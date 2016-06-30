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
            name: 'idformat',
            type: 'auto',
            convert: function (value, record) {
                return Ext.String.leftPad(record.get('id'), 6, '0');
            }
        }, {
            name: 'movimentdate',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'movimentdateformat',
            type: 'auto',
            convert: function (value, record) {
                return Ext.util.Format.date(Ext.Date.parse(record.get('movimentdate'),'Y-m-d'),'d/m/Y');
            }
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