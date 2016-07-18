//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.MaterialCycle', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialCycle',

    storeId: 'materialcycle',

    requires: [
        'iAdmin.model.itembase.MaterialCycle'
    ],

    url: '../iAdmin/business/Calls/materialcycle.php',

    model: 'iAdmin.model.itembase.MaterialCycle',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});