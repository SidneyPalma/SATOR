//@charset UTF-8
Ext.define( 'iAdmin.store.input.Input', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Input',

    storeId: 'input',

    requires: [
        'iAdmin.model.input.Input'
    ],

    url: '../iAdmin/business/Calls/input.php',

    model: 'iAdmin.model.input.Input'

});