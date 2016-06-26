//@charset UTF-8
Ext.define( 'iAdmin.store.input.InputPresentation', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.InputPresentation',

    storeId: 'inputpresentation',

    requires: [
        'iAdmin.model.input.InputPresentation'
    ],

    url: '../iAdmin/business/Calls/inputpresentation.php',

    model: 'iAdmin.model.input.InputPresentation',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});