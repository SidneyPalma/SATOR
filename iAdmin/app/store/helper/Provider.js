//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Provider', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Provider',

    storeId: 'provider',

    requires: [
        'iAdmin.model.helper.Provider'
    ],

    url: '../iAdmin/business/Calls/provider.php',

    model: 'iAdmin.model.helper.Provider',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});