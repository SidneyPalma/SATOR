//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.InputPresentation', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.InputPresentation',

    storeId: 'inputpresentation',

    requires: [
        'iAdmin.model.itembase.InputPresentation'
    ],

    url: '../iAdmin/business/Calls/inputpresentation.php',

    model: 'iAdmin.model.itembase.InputPresentation',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});