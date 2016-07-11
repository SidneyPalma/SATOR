//@charset UTF-8
Ext.define( 'iAdmin.store.person.Proprietary', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Proprietary',

    storeId: 'proprietary',

    requires: [
        'iAdmin.model.person.Proprietary'
    ],

    url: '../iAdmin/business/Calls/proprietary.php',

    model: 'iAdmin.model.person.Proprietary',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});