//@charset UTF-8
Ext.define( 'iAdmin.store.areas.CMESubAreasDeposit', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.CMESubAreasDeposit',

    storeId: 'cmesubareasdeposit',

    requires: [
        'iAdmin.model.areas.CMESubAreasDeposit'
    ],

    url: '../iAdmin/business/Calls/cmesubareasdeposit.php',

    model: 'iAdmin.model.areas.CMESubAreasDeposit',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});