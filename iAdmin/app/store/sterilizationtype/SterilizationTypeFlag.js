//@charset UTF-8
Ext.define( 'iAdmin.store.sterilizationtype.SterilizationTypeFlag', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.SterilizationTypeFlag',

    storeId: 'sterilizationtypeflag',

    url: '../iAdmin/business/Calls/sterilizationtype.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean'
        }
    ],

    config: {
        extraParams: {
            method: 'selectFlag'
        }
    }

});