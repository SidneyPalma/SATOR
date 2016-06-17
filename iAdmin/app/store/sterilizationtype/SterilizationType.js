//@charset UTF-8
Ext.define( 'iAdmin.store.sterilizationtype.SterilizationType', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.SterilizationType',

    storeId: 'sterilizationtype',

    requires: [
        'iAdmin.model.sterilizationtype.SterilizationType'
    ],

    url: '../iAdmin/business/Calls/sterilizationtype.php',

    model: 'iAdmin.model.sterilizationtype.SterilizationType'

});