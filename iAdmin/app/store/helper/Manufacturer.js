//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Manufacturer', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Manufacturer',

    storeId: 'manufacturer',

    requires: [
        'iAdmin.model.helper.Manufacturer'
    ],

    url: '../iAdmin/business/Calls/manufacturer.php',

    model: 'iAdmin.model.helper.Manufacturer',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});