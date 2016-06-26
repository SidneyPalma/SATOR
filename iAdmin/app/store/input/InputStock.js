//@charset UTF-8
Ext.define( 'iAdmin.store.input.InputStock', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.InputStock',

    storeId: 'inputstock',

    requires: [
        'iAdmin.model.input.InputStock'
    ],

    url: '../iAdmin/business/Calls/inputstock.php',

    model: 'iAdmin.model.input.InputStock'

});