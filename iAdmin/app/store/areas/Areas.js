//@charset UTF-8
Ext.define( 'iAdmin.store.areas.Areas', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Areas',

    storeId: 'areas',

    requires: [
        'iAdmin.model.areas.Areas'
    ],

    url: '../iAdmin/business/Calls/areas.php',

    model: 'iAdmin.model.areas.Areas'

});