//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.InputStock', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.InputStock',

    storeId: 'inputstock',

    requires: [
        'iAdmin.model.itembase.InputStock'
    ],

    url: '../iAdmin/business/Calls/inputstock.php',

    model: 'iAdmin.model.itembase.InputStock',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});