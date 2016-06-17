//@charset UTF-8
Ext.define( 'iAdmin.store.service.ServiceStructure', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ServiceStructure',

    storeId: 'servicestructure',

    requires: [
        'iAdmin.model.service.ServiceStructure'
    ],

    url: '../iAdmin/business/Calls/servicestructure.php',

    model: 'iAdmin.model.service.ServiceStructure'

});