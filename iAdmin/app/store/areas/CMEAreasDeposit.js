//@charset UTF-8
Ext.define( 'iAdmin.store.areas.CMEAreasDeposit', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.CMEAreasDeposit',

    storeId: 'cmeareasdeposit',

    requires: [
        'iAdmin.model.areas.CMEAreasDeposit'
    ],

    url: '../iAdmin/business/Calls/cmeareasdeposit.php',

    model: 'iAdmin.model.areas.CMEAreasDeposit',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});