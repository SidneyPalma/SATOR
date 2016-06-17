//@charset UTF-8
Ext.define( 'iAdmin.store.service.ServiceStructureField', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ServiceStructureField',

    storeId: 'servicestructurefield',

    requires: [
        'iAdmin.model.service.ServiceStructureField'
    ],

    url: '../iAdmin/business/Calls/servicestructurefield.php',

    model: 'iAdmin.model.service.ServiceStructureField'

});