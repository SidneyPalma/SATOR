//@charset UTF-8
Ext.define( 'iAdmin.store.box.MaterialBox', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialBox',

    storeId: 'materialbox',

    requires: [
        'iAdmin.model.box.MaterialBox'
    ],

    url: '../iAdmin/business/Calls/materialbox.php',

    model: 'iAdmin.model.box.MaterialBox',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});