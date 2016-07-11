//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Flowing', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Flowing',

    storeId: 'flowing',

    requires: [
        'iAdmin.model.helper.Flowing'
    ],

    url: '../iAdmin/business/Calls/flowing.php',

    model: 'iAdmin.model.helper.Flowing',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});