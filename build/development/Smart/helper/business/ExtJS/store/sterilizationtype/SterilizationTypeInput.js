//@charset UTF-8
Ext.define( 'iAdmin.store.sterilizationtype.SterilizationTypeInput', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.SterilizationTypeInput',

    storeId: 'sterilizationtypeinput',

    requires: [
        'iAdmin.model.sterilizationtype.SterilizationTypeInput'
    ],

    url: '../iAdmin/business/Calls/sterilizationtypeinput.php',

    model: 'iAdmin.model.sterilizationtype.SterilizationTypeInput'

});