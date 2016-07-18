//@charset UTF-8
Ext.define( 'iAdmin.store.areas.MaterialCycle', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialCycle',

    storeId: 'materialcycle',

    requires: [
        'iAdmin.model.areas.MaterialCycle'
    ],

    url: '../iAdmin/business/Calls/materialcycle.php',

    model: 'iAdmin.model.areas.MaterialCycle'

});