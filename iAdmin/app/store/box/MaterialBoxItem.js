//@charset UTF-8
Ext.define( 'iAdmin.store.box.MaterialBoxItem', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialBoxItem',

    storeId: 'materialboxitem',

    requires: [
        'iAdmin.model.box.MaterialBoxItem'
    ],

    url: '../iAdmin/business/Calls/materialboxitem.php',

    model: 'iAdmin.model.box.MaterialBoxItem',

    config: {
        extraParams: {
            method: 'selectCode'
        }
    }

});