//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.ItemBaseServiceType', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ItemBaseServiceType',

    storeId: 'itembaseservicetype',

    requires: [
        'iAdmin.model.itembase.ItemBaseServiceType'
    ],

    url: '../iAdmin/business/Calls/itembaseservicetype.php',

    model: 'iAdmin.model.itembase.ItemBaseServiceType',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});