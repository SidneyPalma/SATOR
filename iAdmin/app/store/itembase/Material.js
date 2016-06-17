//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.Material', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Material',

    storeId: 'material',

    requires: [
        'iAdmin.model.itembase.Material'
    ],

    url: '../iAdmin/business/Calls/material.php',

    model: 'iAdmin.model.itembase.Material',

    config: {
        extraParams: {
            fields: Ext.encode(['id','name','description','isactive']),
            params: Ext.encode(['name','description'])
        }
    }

});