//@charset UTF-8
Ext.define( 'iAdmin.store.box.MaterialBoxItemSearch', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialBoxItemSearch',

    storeId: 'materialboxitemsearch',

    requires: [
        'iAdmin.model.box.MaterialBoxItem'
    ],

    url: '../iAdmin/business/Calls/materialboxitem.php',

    model: 'iAdmin.model.box.MaterialBoxItem',

    config: {
        extraParams: {
            method: 'selectLike'
        }
    }

});