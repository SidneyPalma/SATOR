//@charset UTF-8
Ext.define( 'iAdmin.store.box.MaterialBoxTarge', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MaterialBoxTarge',

    storeId: 'materialboxtarge',

    requires: [
        'iAdmin.model.box.MaterialBoxTarge'
    ],

    url: '../iAdmin/business/Calls/materialboxtarge.php',

    model: 'iAdmin.model.box.MaterialBoxTarge',

    config: {
        extraParams: {
            method: 'selectCode'
        }
    }

});