//@charset UTF-8
Ext.define( 'iAdmin.store.menu.Menu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Menu',

    storeId: 'menu',

    requires: [
        'iAdmin.model.menu.Menu'
    ],

    url: '../iAdmin/business/Calls/menu.php',

    model: 'iAdmin.model.menu.Menu',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});