//@charset UTF-8
Ext.define( 'iAdmin.store.helper.MaterialStatus', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialStatus',

    storeId: 'materialstatus',

    requires: [
        'iAdmin.model.helper.MaterialStatus'
    ],

    url: '../iAdmin/business/Calls/materialstatus.php',

    model: 'iAdmin.model.helper.MaterialStatus',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});