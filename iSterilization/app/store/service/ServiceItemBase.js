//@charset UTF-8
Ext.define( 'iSterilization.store.service.ServiceItemBase', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ServiceItemBase',

    storeId: 'serviceitembase',

    requires: [
        'iSterilization.model.service.ServiceItemBase'
    ],

    url: '../iSterilization/business/Calls/serviceregistration.php',

    model: 'iSterilization.model.service.ServiceItemBase',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectItem'
        }
    }

});