//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.MaterialTypeFlow', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialTypeFlow',

    storeId: 'materialtypeflow',

    requires: [
        'iAdmin.model.itembase.MaterialTypeFlow'
    ],

    url: '../iAdmin/business/Calls/materialtypeflow.php',

    model: 'iAdmin.model.itembase.MaterialTypeFlow',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});