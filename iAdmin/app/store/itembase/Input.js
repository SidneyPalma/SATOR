//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.Input', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Input',

    storeId: 'input',

    requires: [
        'iAdmin.model.itembase.Input'
    ],

    url: '../iAdmin/business/Calls/input.php',

    model: 'iAdmin.model.itembase.Input',

    config: {
        extraParams: {
            fields: Ext.encode(['id','name','description','isactive']),
            params: Ext.encode(['name','description'])
        }
    }

});