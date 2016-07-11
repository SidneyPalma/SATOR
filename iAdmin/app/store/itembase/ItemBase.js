//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.ItemBase', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ItemBase',

    storeId: 'itembase',

    requires: [
        'iAdmin.model.itembase.ItemBase'
    ],

    url: '../iAdmin/business/Calls/itembase.php',

    model: 'iAdmin.model.itembase.ItemBase',

    config: {
        extraParams: {
            fields: Ext.encode(['id','name','resultfield']),
            params: Ext.encode(['name'])
        }
    }

});