//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.Equipment', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Equipment',

    storeId: 'equipment',

    requires: [
        'iAdmin.model.itembase.Equipment'
    ],

    url: '../iAdmin/business/Calls/equipment.php',

    model: 'iAdmin.model.itembase.Equipment',

    config: {
        extraParams: {
            fields: Ext.encode(['id','name','description','isactive']),
            params: Ext.encode(['name','description'])
        }
    }

});