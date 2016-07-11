//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Instrumentator', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Instrumentator',

    storeId: 'instrumentator',

    requires: [
        'iAdmin.model.helper.Instrumentator'
    ],

    url: '../iAdmin/business/Calls/instrumentator.php',

    model: 'iAdmin.model.helper.Instrumentator',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});