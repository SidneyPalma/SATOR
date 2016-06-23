//@charset UTF-8
Ext.define( 'iAdmin.store.helper.UnitMeasurement', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UnitMeasurement',

    storeId: 'unitmeasurement',

    requires: [
        'iAdmin.model.helper.UnitMeasurement'
    ],

    url: '../iAdmin/business/Calls/unitmeasurement.php',

    model: 'iAdmin.model.helper.UnitMeasurement'

});