//@charset UTF-8
Ext.define( 'iAdmin.store.menu.Action', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Action',

    storeId: 'action',

    requires: [
        'iAdmin.model.menu.Action'
    ],

    url: '../iAdmin/business/Calls/action.php',

    model: 'iAdmin.model.menu.Action'

});