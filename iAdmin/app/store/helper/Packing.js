//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Packing', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Packing',

    storeId: 'packing',

    requires: [
        'iAdmin.model.helper.Packing'
    ],

    url: '../iAdmin/business/Calls/packing.php',

    model: 'iAdmin.model.helper.Packing',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});