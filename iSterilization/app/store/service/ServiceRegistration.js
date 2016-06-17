//@charset UTF-8
Ext.define( 'iSterilization.store.service.ServiceRegistration', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ServiceRegistration',

    storeId: 'serviceregistration',

    requires: [
        'iSterilization.model.service.ServiceRegistration'
    ],

    url: '../iSterilization/business/Calls/serviceregistration.php',

    model: 'iSterilization.model.service.ServiceRegistration'

});