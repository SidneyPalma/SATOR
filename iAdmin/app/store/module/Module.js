//@charset UTF-8
Ext.define( 'iAdmin.store.module.Module', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Module',

    storeId: 'module',

    requires: [
        'iAdmin.model.module.Module'
    ],

    url: '../iAdmin/business/Calls/module.php',

    model: 'iAdmin.model.module.Module',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});