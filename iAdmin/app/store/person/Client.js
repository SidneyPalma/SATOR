//@charset UTF-8
Ext.define( 'iAdmin.store.person.Client', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Client',

    storeId: 'client',

    requires: [
        'iAdmin.model.person.Client'
    ],

    url: '../iAdmin/business/Calls/client.php',

    model: 'iAdmin.model.person.Client',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});