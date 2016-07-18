//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Cycle', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Cycle',

    storeId: 'cycle',

    requires: [
        'iAdmin.model.helper.Cycle'
    ],

    url: '../iAdmin/business/Calls/cycle.php',

    model: 'iAdmin.model.helper.Cycle'

});