//@charset UTF-8
Ext.define( 'iAdmin.store.person.Entity', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Entity',

    storeId: 'entity',

    requires: [
        'iAdmin.model.person.Entity'
    ],

    url: '../iAdmin/business/Calls/entity.php',

    model: 'iAdmin.model.person.Entity',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});